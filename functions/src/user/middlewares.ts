import { auth } from "../config/firebase";

// Types
import Request from "../utils/types/CustomRequest";
import { Response, NextFunction } from "express";
import { FirebaseError } from "firebase-admin";

const makeMiddleware = (identity?: "admin" | "user") => {
  const middleware = async (
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
            msg: "Invalid or missing Authentication header.",
            data: null,
          },
        });
      }

      // Verifying idToken
      const user = await auth
        .verifyIdToken(idToken)
        .then((u) => u)
        .catch((err: FirebaseError) => err.message);

      if (typeof user === "string" || !user) {
        console.log(user);
        return res.status(400).json({
          body: null,
          error: {
            msg: "Invalid account.",
            data: null,
          },
        });
      }

      if (identity === "admin" && !user.admin) {
        return res.status(400).json({
          body: null,
          error: {
            msg: "Not an admin account.",
            data: null,
          },
        });
      }

      if (identity === "user" && user.admin) {
        return res.status(400).json({
          body: null,
          error: {
            msg: "Not an user account.",
            data: null,
          },
        });
      }

      req.user = {
        id: user.uid,
        isAdmin: user.admin,
      };
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

  return middleware;
};

const login = makeMiddleware();
const userLogin = makeMiddleware("user");
const adminLogin = makeMiddleware("admin");

export { login, userLogin, adminLogin };
