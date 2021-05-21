import { firestore } from "firebase-admin";
import { db, collections } from "../config/firebase";
import { types as mailListTypes } from "../mailList";
import { types as mailListItemTypes } from "../mailListItem";
import { types as userTypes } from "../user";
import { EmailListItem } from "../utils/parse";
import mailer from "./mailer";

const sendMails = async () => {
  // Finding incomplete mailLists
  const incompleteMailLists = (await db
    .collection(collections.mailList)
    .where("complete", "==", false)
    .orderBy("date", "asc")
    .get()) as firestore.QuerySnapshot<mailListTypes.MailListDocumentData>;

  if (incompleteMailLists.empty || incompleteMailLists.size === 0) {
    console.log("No incomplete templates found.");
    return;
  }

  // Segregating active and inactive mailLists
  const activeMailLists = incompleteMailLists.docs.filter((doc) =>
    Boolean(doc.data().active)
  );
  const inactiveMailLists = incompleteMailLists.docs.filter(
    (doc) => !Boolean(doc.data().active)
  );

  // Validating activeMailLists
  if (activeMailLists.length === 0) {
    console.log("No active template found.");

    // Mark first inactiveMailList if any as active
    if (inactiveMailLists.length > 0) {
      await inactiveMailLists[0].ref.update({
        active: true,
      });
    }
    return;
  } else if (activeMailLists.length > 1) {
    console.log("Multiple active templates found.");
    return;
  }

  // Finding the oldest unsent mailListItems corresponding to activeMailList
  const activeMailList = activeMailLists[0];
  const currentDate = firestore.Timestamp.now();

  // Finding user SMTP
  const userSnap = await db
    .collection(collections.user)
    .doc(activeMailList.data().uid)
    .get()
    .catch((err: Error) => err.message);

  if (typeof userSnap === "string" || !userSnap.exists) {
    console.log("User account not found.");
    return;
  }

  const userData = userSnap.data() as
    | userTypes.UserProfileDocumentData
    | undefined;

  if (
    !userData ||
    !userData.smtp ||
    !userData.smtp.email ||
    !userData.smtp.password
  ) {
    console.log("SMTP information missing.");
    return;
  }

  const pendingMailListItems = (await db
    .collection(collections.mailListItem)
    .where("mailListId", "==", activeMailList.id)
    .where("sent", "==", false)
    .where("date", "<=", currentDate)
    .orderBy("date", "asc")
    .get()) as firestore.QuerySnapshot<mailListItemTypes.MailListItemDocumentData>;

  // Validating pendingMailListItems
  if (pendingMailListItems.empty || pendingMailListItems.size === 0) {
    console.log("No pending mail list items found.");
    return;
  }

  // Selecting at max 2 pendingMailListItems
  const pendingMailListItemDocs = pendingMailListItems.docs.slice(0, 2);

  // Send emails
  const emailData: EmailListItem[] = [];
  pendingMailListItemDocs.forEach((doc) => {
    emailData.push(...doc.data().list);
  });
  await mailer(activeMailList.data(), emailData);

  const promiseArr: Promise<firestore.WriteResult>[] = [];
  // Last mailListItem for activeMailList was sent
  if (
    Boolean(pendingMailListItemDocs[0].data().last) ||
    Boolean(pendingMailListItemDocs[1].data().last)
  ) {
    // Mark activeMailList as inactive and complete
    promiseArr.push(
      activeMailList.ref.update({
        active: false,
        complete: true,
        lastSent: currentDate,
      })
    );

    // Mark the first inactiveMailList as active
    if (inactiveMailLists.length > 0) {
      promiseArr.push(
        inactiveMailLists[0].ref.update({
          active: true,
        })
      );
    }
  }

  // Mark pendingMailListItemDocs as sent
  promiseArr.push(
    ...pendingMailListItemDocs.map((doc) =>
      doc.ref.update({
        sent: true,
      })
    )
  );

  // Update lastSent in activeMailList
  promiseArr.push(
    activeMailList.ref.update({
      lastSent: currentDate,
    })
  );

  await Promise.all(promiseArr);
};

sendMails();
