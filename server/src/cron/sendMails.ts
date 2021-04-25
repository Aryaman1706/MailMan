// import { firestore } from "firebase-admin";
import { db, collections } from "../config/firebase";
import mailer from "./mailer";

const sendMails = async () => {
  // const currentDate = firestore.Timestamp.fromDate(new Date());

  const pendingMailList = await db
    .collection(collections.mailList)
    // .where("date", "<=", currentDate)
    .where("sent", "==", false)
    .orderBy("date", "asc")
    .get();

  if (pendingMailList.empty) {
    console.log("No mails in pipeline.");
    return;
  }

  const currentBatch = pendingMailList.docs[0];

  const template = (
    await db
      .collection(collections.template)
      .doc(currentBatch.data().templateId)
      .get()
  ).data() as { html: string; subject: string };

  if (!template) {
    console.log("Template not found.");
    return;
  }

  await mailer(template.html, template.subject, currentBatch.data().list);
  await currentBatch.ref.update({ sent: true });
  console.log("Current batch modified");
};

sendMails();
