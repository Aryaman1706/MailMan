import { db, collections } from "../config/firebase";

import { firestore } from "firebase-admin";
import { types as mailListTypes } from "../mailList";
import { types as mailListItemTypes } from "../mailListItem";
import { types as userTypes } from "../user";
import { types as templateTypes } from "../template";

import mailer from "./mailer";

const sendMails = async () => {
  try {
    const incompleteMailLists = (await db
      .collection(collections.mailList)
      .where("complete", "==", false)
      .orderBy("addedOn", "asc")
      .get()) as firestore.QuerySnapshot<mailListTypes.MailListDocumentData>;

    if (incompleteMailLists.empty || incompleteMailLists.size === 0) {
      console.log("No incomplete mailList found.");
      return;
    }

    const activeMailLists = incompleteMailLists.docs.filter((doc) =>
      Boolean(doc.data().active)
    );
    const inactiveMailLists = incompleteMailLists.docs.filter(
      (doc) => !Boolean(doc.data().active)
    );

    // If more than one mailList is active at same time
    if (activeMailLists.length > 1) {
      // TODO
      console.log("Multiple active mailLists found.");
      return;
    }

    let activeMailList = activeMailLists.length > 0 ? activeMailLists[0] : null;

    // If no active mailList found
    // then set the first mailList in inactiveMailList to be active if present
    if (!activeMailList) {
      console.log("No active mailList found.");

      if (inactiveMailLists.length > 0) {
        await inactiveMailLists[0].ref.update({
          active: true,
        });

        activeMailList = inactiveMailLists[0];
      } else {
        console.log("No inactive mailList found.");
        return;
      }
    }
    console.log(activeMailList.id);

    // Validating user SMTP
    const userSnap = (await db
      .collection(collections.user)
      .doc(activeMailList.data().uid)
      .get()
      .catch((err: Error) => err.message)) as
      | firestore.DocumentSnapshot<userTypes.UserProfileDocumentData>
      | string;

    if (typeof userSnap === "string" || !userSnap.exists) {
      console.log("User account not found.");
      return;
    }

    const userData = userSnap.data();

    if (
      !userData ||
      !userData.smtp ||
      !userData.smtp.email ||
      !userData.smtp.password
    ) {
      console.log("SMTP information missing.");
      return;
    }

    const currentDate = new Date();
    const lastSent = activeMailList.data().lastSent?.toDate() || null;

    if (lastSent) {
      lastSent.setHours(1, 10);

      if (currentDate < lastSent) {
        return;
      }
    }

    const pendingMailListItems = (await db
      .collection(collections.mailListItem)
      .where("mailListId", "==", activeMailList.id)
      .where("sent", "==", false)
      .orderBy("date", "asc")
      .get()) as firestore.QuerySnapshot<mailListItemTypes.MailListItemDocumentData>;

    if (pendingMailListItems.empty) {
      console.log("No pending mail list items found.");
      await activeMailList.ref.update({
        active: false,
        complete: true,
      });

      return;
    }

    // Selecting at max 2 pendingMailListItems
    const pendingMailListItemDocs = pendingMailListItems.docs.slice(0, 2);

    // Send emails
    const emailData: templateTypes.Format[] = [];
    pendingMailListItemDocs.forEach((doc) => {
      emailData.push(...doc.data().list);
    });
    await mailer(
      activeMailList.data(),
      userData.smtp as { email: string; password: string },
      emailData
    );

    const promiseArr: Promise<firestore.WriteResult>[] = [];
    // // Last mailListItem for activeMailList was sent
    // if (
    //   Boolean(pendingMailListItemDocs[0]?.data()?.last) ||
    //   Boolean(pendingMailListItemDocs[1]?.data()?.last)
    // ) {
    //   // Mark activeMailList as inactive and complete
    //   promiseArr.push(
    //     activeMailList.ref.update({
    //       active: false,
    //       complete: true,
    //       lastSent: currentDate,
    //     })
    //   );

    //   // Mark the first inactiveMailList as active
    //   if (inactiveMailLists.length > 0) {
    //     promiseArr.push(
    //       inactiveMailLists[0].ref.update({
    //         active: true,
    //       })
    //     );
    //   }
    // }

    console.log({
      doc1: pendingMailListItemDocs[0]?.data(),
      doc2: pendingMailListItemDocs[1]?.data(),
    });

    // Mark pendingMailListItemDocs as sent
    promiseArr.push(
      ...pendingMailListItemDocs.map((doc) =>
        doc.ref.update({
          sent: true,
          sentOn: firestore.Timestamp.fromDate(currentDate),
        })
      )
    );

    // Update lastSent in activeMailList
    promiseArr.push(
      activeMailList.ref.update({
        lastSent: firestore.Timestamp.fromDate(currentDate),
      })
    );

    await Promise.all(promiseArr);
  } catch (error) {
    console.error(error);
  }
};

export default sendMails;
// sendMails();
