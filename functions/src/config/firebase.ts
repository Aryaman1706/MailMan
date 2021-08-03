import admin from "firebase-admin";
import path from "path";

const serviceAccount = path.resolve(
  __dirname,
  "../",
  "../",
  "serviceAccount.json"
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "mailman-299d7",
  storageBucket: "mailman-299d7.appspot.com",
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
