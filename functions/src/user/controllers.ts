import { db, collections, auth } from "../config/firebase";
import CryptoJS from "crypto-js";

// Types
import Request from "../utils/types/CustomRequest";
import { Response } from "express";
import { FirebaseError } from "firebase-admin";
import { UserProfileData, UserProfileDocumentData } from "./types";

// Utils
import * as validators from "./validators";
import sendResponse, {
  serverErrorResponse,
} from "../utils/functions/sendResponse";

// * SignUp a new user
export const signupUser = async (
  req: Request<validators.UserSignupBody>,
  res: Response
) => {
  try {
    if (req.body.smtp && req.body.smtp.password) {
      req.body.smtp.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_PASSPHRASE as string
      ).toString();
    }

    const user = await auth
      .createUser({
        email: req.body.email,
        password: req.body.password,
      })
      .then((user) => user)
      .catch((err: FirebaseError) => err.message);

    if (typeof user === "string") {
      return sendResponse(res, 400, "User could not be created.");
    }

    const userProfileData: UserProfileData = {
      isAdmin: req.body.isAdmin,
      uid: user.uid,
      smtp: req.body.smtp,
    };

    await Promise.all([
      db.collection(collections.user).doc(user.uid).create(userProfileData),
      auth.setCustomUserClaims(user.uid, {
        admin: req.body.isAdmin,
      }),
    ]);

    return sendResponse(res, 200, null, "New user created successfully.");
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};

// * Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.id;
    if (!uid) {
      return sendResponse(res, 400, "Invalid user.");
    }

    const [userSnap, userRecord] = await Promise.all([
      db.collection(collections.user).doc(uid).get(),
      auth.getUser(uid),
    ]);

    if (!userSnap || !userRecord) {
      return sendResponse(res, 404, "User not found.");
    }

    const userData = userSnap.data() as UserProfileDocumentData | undefined;
    if (!userData) {
      return sendResponse(res, 404, "User is empty.");
    }

    const userProfile = {
      smtp: userData.smtp,
      email: userRecord.email,
      isAdmin: userData.isAdmin,
    };

    if (userProfile.smtp && userProfile.smtp.password) {
      userProfile.smtp.password = CryptoJS.AES.decrypt(
        userProfile.smtp.password,
        process.env.SECRET_PASSPHRASE as string
      ).toString(CryptoJS.enc.Utf8);
    }

    return sendResponse(res, 200, null, {
      msg: "User found.",
      data: userProfile,
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};

// * Edit user SMTP settings
export const editUser = async (
  req: Request<validators.SmtpBody>,
  res: Response
) => {
  try {
    const uid = req.user?.id;
    if (!uid) {
      return sendResponse(res, 400, "Invalid account.");
    }

    const password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASSPHRASE as string
    ).toString();

    await db
      .collection(collections.user)
      .doc(uid)
      .update({
        smtp: {
          email: req.body.email,
          password: password,
        },
      });

    return sendResponse(res, 200, null, "Updated successfully.");
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};
