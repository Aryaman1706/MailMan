import { firestore } from "firebase-admin";

export interface UserProfileData {
  uid: string;
  smtp: {
    email: string;
    password: string;
  };
}

export interface UserProfileDocumentData
  extends firestore.DocumentData,
    UserProfileData {}
