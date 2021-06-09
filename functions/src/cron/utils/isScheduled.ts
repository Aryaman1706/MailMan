import { firestore } from "firebase-admin";

const isScheduled = (lastSent: firestore.Timestamp | null) => {
  const currentDate = new Date();
  const lastSentDate = lastSent?.toDate() || null;

  if (lastSentDate) {
    lastSentDate.setHours(
      lastSentDate.getHours() + 1,
      lastSentDate.getMinutes() + 10
    );

    if (currentDate < lastSentDate) {
      return false;
    }
  }

  return true;
};

export default isScheduled;
