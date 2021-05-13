import { firestore } from "firebase-admin";

export interface UserProfileData {
  isAdmin: boolean;
  uid: string;
  smtp: {
    email: string | null;
    password?: string | null;
  } | null;
}

export interface UserProfileDocumentData
  extends firestore.DocumentData,
    UserProfileData {}
