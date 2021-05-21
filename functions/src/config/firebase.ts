import admin from "firebase-admin";

admin.initializeApp();

export const collections = {
  user: "user",
  template: "template",
  mailList: "mailList",
  mailListItem: "mailListItem",
};

export const db = admin.firestore();

export const bucket = admin.storage().bucket();

export const auth = admin.auth();
