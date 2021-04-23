import admin from "firebase-admin";
import path from "path";

const serviceAccount = path.resolve(
  __dirname,
  "../",
  "../",
  "av-mailer-396d7-firebase-adminsdk-m7d0y-8881d8f398.json"
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin.firestore();
