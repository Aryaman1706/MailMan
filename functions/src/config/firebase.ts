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
  projectId: "mailman-262e8",
  storageBucket: "mailman-262e8.appspot.com",
});

// Connect to Firestore emulator for development
if (process.env.FUNCTIONS_EMULATOR === 'true') {
  admin.firestore().settings({
    host: 'localhost:8080',
    ssl: false
  });
}

export const collections = {
  user: "user",
  template: "template",
  mailList: "mailList",
  mailListItem: "mailListItem",
};

export const db = admin.firestore();

export const bucket = admin.storage().bucket();

export const auth = admin.auth();
