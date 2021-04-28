import { firestore } from "firebase-admin";
import { db, collections } from "../config/firebase";
import {
  MailListDocumentData,
  TemplateDocumentData,
} from "../controllers/customTypes";
import mailer from "./mailer";

const sendMails = async () => {
  // Finding incomplete templates
  const incompleteTemplates = (await db
    .collection(collections.template)
    .where("complete", "==", false)
    .orderBy("date", "asc")
    .get()) as firestore.QuerySnapshot<TemplateDocumentData>;

  if (incompleteTemplates.empty || incompleteTemplates.docs.length === 0) {
    console.log("No incomplete templates found.");
    return;
  }

  // segregating active and inactive templates
  const activeTemplatesList = incompleteTemplates.docs.filter((doc) =>
    Boolean(doc.data().active)
  );
  const inactiveTemplatesList = incompleteTemplates.docs.filter(
    (doc) => !Boolean(doc.data().active)
  );

  // Validating activeTemplates
  if (activeTemplatesList.length === 0) {
    console.log("No active template found.");
    return;
  } else if (activeTemplatesList.length > 1) {
    console.log("Multiple active templates found.");
    return;
  }
  const activeTemplate = activeTemplatesList[0];

  // Finding mailList corresponding to activeTemplate
  // const currentDate = firestore.Timestamp.fromDate(new Date());
  const pendingMailList = (await db
    .collection(collections.mailList)
    .where("templateId", "==", activeTemplate.id)
    .where("sent", "==", false)
    // .where("date", "<=", currentDate)
    .orderBy("date", "asc")
    .get()) as firestore.QuerySnapshot<MailListDocumentData>;

  // Validating pendingMailList
  if (pendingMailList.empty || pendingMailList.docs.length === 0) {
    console.log("No mails in pipeline.");
    return;
  }

  const currentBatch = pendingMailList.docs[0];

  // Send out mails
  await mailer(
    activeTemplate.data().html,
    activeTemplate.data().subject,
    currentBatch.data().list
  );

  const promiseArr = [];

  // If last mailList was sent
  if (currentBatch.data().last) {
    promiseArr.push(
      // Mark activeTemplate as inactive and complete
      activeTemplate.ref.update({
        complete: true,
        active: false,
      })
    );

    // Make next template active
    if (inactiveTemplatesList.length >= 1) {
      inactiveTemplatesList[0].ref.update({
        active: true,
      });
    }
  }

  // Update currentBatch
  promiseArr.push(
    currentBatch.ref.update({
      sent: true,
    })
  );

  await Promise.all(promiseArr);
  console.log("Current batch modified");
};

sendMails();
