import { Request } from "express";

type UserData = {
  id: string;
  isAdmin: boolean;
};
interface CustomRequest<T = any> extends Omit<Request, "body"> {
  user?: UserData;
  body: T;
}

export default CustomRequest;
