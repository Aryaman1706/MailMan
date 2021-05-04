import { Request } from "express";

export default interface ReqUser extends Request {
  user?: string;
}
