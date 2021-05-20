import { Request, Response } from "express";
import { db, collections, auth } from "../config/firebase";
import ReqUser from "../utils/ReqUser";
import CryptoJS from "crypto-js";
import { FirebaseError } from "firebase-admin";

// * Utils
import * as validators from "../utils/validators/user";
import { UserProfileData, UserProfileDocumentData } from "./customTypes";

// * SignUp a new user
export const signupUser = async (req: Request, res: Response) => {
  try {
    // Validate req.body
    const { value, error } = validators.userSignup(req.body);
    if (error)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });

    // Encrypt the password
    if (value.smtp && value.smtp.password) {
      value.smtp.password = CryptoJS.AES.encrypt(
        value.password,
        process.env.SECRET_PASSPHRASE as string
      ).toString();
    }

    // Create user
    const user = await auth
      .createUser({
        email: value.email,
        password: value.password,
      })
      .then((user) => user)
      .catch((err: FirebaseError) => err.message);

    if (typeof user === "string") {
      return res.status(400).json({
        body: null,
        error: {
          msg: "User could be created.",
          data: user,
        },
      });
    }

    // Create user in firestore and add customClaims
    const userProfileData: UserProfileData = {
      isAdmin: value.isAdmin,
      uid: user.uid,
      smtp: value.smtp,
    };

    await Promise.all([
      db.collection(collections.user).doc(user.uid).create(userProfileData),
      auth.setCustomUserClaims(user.uid, {
        admin: value.isAdmin,
      }),
    ]);

    return res.status(200).json({
      body: {
        msg: "New user created successfully.",
        data: null,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      body: null,
      error: {
        msg: "Request failed. Try again.",
        data: null,
      },
    });
  }
};

// * Get user profile
export const getProfile = async (req: ReqUser, res: Response) => {
  try {
    // Verfying uid
    const uid = req.user?.id;
    if (!uid) {
      return res.status(400).json({
        body: {
          msg: "Invalid user.",
          data: null,
        },
        error: null,
      });
    }

    // Finding valid user document
    const [userSnap, userRecord] = await Promise.all([
      db.collection(collections.user).doc(uid).get(),
      auth.getUser(uid),
    ]);

    if (!userSnap || !userRecord)
      return res.status(400).json({
        body: null,
        error: {
          msg: "User not found.",
          data: null,
        },
      });

    const userData = userSnap.data() as UserProfileDocumentData | undefined;
    if (!userData) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid User.",
          data: null,
        },
      });
    }

    const userProfile = {
      smtp: userData.smtp,
      email: userRecord.email,
      isAdmin: userData.isAdmin,
    };

    // Decrypting password
    if (userProfile.smtp && userProfile.smtp.password) {
      userProfile.smtp.password = CryptoJS.AES.decrypt(
        userProfile.smtp.password,
        process.env.SECRET_PASSPHRASE as string
      ).toString(CryptoJS.enc.Utf8);
    }

    return res.status(200).json({
      body: {
        msg: "User found.",
        data: userProfile,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      body: null,
      error: {
        msg: "Request failed. Try again.",
        data: null,
      },
    });
  }
};

// * Edit user SMTP settings
export const editUser = async (req: ReqUser, res: Response) => {
  try {
    // Validating request body
    const { value, error } = validators.smtpEdit(req.body);
    if (error)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });

    // Encrypting password
    const password = CryptoJS.AES.encrypt(
      value.password,
      process.env.SECRET_PASSPHRASE as string
    ).toString();
    console.log(password);

    // Validating uid
    const uid = req.user?.id;
    if (!uid) {
      return res.status(400).json({
        body: {
          msg: "Invalid account.",
          data: null,
        },
        error: null,
      });
    }

    // Finding and updating user document
    await db
      .collection(collections.user)
      .doc(uid)
      .update({
        smtp: {
          email: value.email,
          password: password,
        },
      });

    return res.status(200).json({
      body: {
        msg: "Updated successfully.",
        data: null,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      body: null,
      error: {
        msg: "Request failed. Try again.",
        data: null,
      },
    });
  }
};
