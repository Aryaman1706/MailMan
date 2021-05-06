import { Request, Response } from "express";
import { db, collections, auth } from "../config/firebase";
import ReqUser from "../utils/ReqUser";
import CryptoJS from "crypto-js";

// * Utils
import { userSignup, smtpEdit } from "../utils/validators/user";

// * SignUp a new user
export const signupUser = async (req: Request, res: Response) => {
  try {
    // Validate req.body
    const { value, error } = userSignup(req.body);
    if (error)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });

    // Create user
    const { uid } = await auth.createUser({
      email: value.email,
      password: value.password,
    });

    // Create user in firestore and add customClaims
    await Promise.all([
      db
        .collection(collections.user)
        .doc(uid)
        .create({
          uid,
          smtp: value.smtp || null,
        }),
      auth.setCustomUserClaims(uid, {
        admin: false,
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

// * Edit user SMTP settings
export const editUser = async (req: ReqUser, res: Response) => {
  try {
    // Validating request body
    const { value, error } = smtpEdit(req.body);
    if (error)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });

    // Decoding password
    const password = CryptoJS.AES.decrypt(
      value.password,
      process.env.SECRET_PASSPHRASE as string
    ).toString(CryptoJS.enc.Utf8);
    console.log(password);

    // Validating uid
    const uid = req.user;
    if (!uid) {
      return res.status(400).json({
        body: {
          msg: "Invalid user.",
          data: null,
        },
        error: null,
      });
    }

    // Finding and updating user document
    db.collection(collections.user)
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
