import { firestore } from "firebase-admin";

export interface UserProfileData {
  isAdmin: boolean;
  uid: string;
  smtp: {
    email: string;
    password: string;
  };
}

export interface UserProfileDocumentData
  extends firestore.DocumentData,
    UserProfileData {}
