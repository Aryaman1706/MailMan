import { Response, NextFunction } from "express";
import { auth } from "../config/firebase";
import Request from "../utils/ReqUser";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Getting idToken from req.headers
    const idToken = req.headers["auth-id-token"];
    if (!idToken || typeof idToken !== "string") {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid authentication header.",
          data: null,
        },
      });
    }

    // Verifying idToken
    const user = await auth.verifyIdToken(idToken);

    if (!user || user.admin) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid user.",
          data: null,
        },
      });
    }

    req.user = user.uid;
    next();
    return;
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
