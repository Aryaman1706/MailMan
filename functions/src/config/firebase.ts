import admin from "firebase-admin";
import path from "path";

const serviceAccount = path.resolve(
  __dirname,
  "../",
  "../",
  "av-mailer-01-firebase-adminsdk-9xgsj-dd14fc3947.json"
);

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  projectId: "av-mailer-01",
  storageBucket: "av-mailer-01.appspot.com",
});

export const collections = {
  user: "user",
  template: "template",
  mailList: "mailList",
  mailListItem: "mailListItem",
};

export const db = admin.firestore();

export const bucket = admin.storage().bucket();

export const auth = admin.auth();
