import * as express from "express";
import { ICreateUser, IEditUserProps } from "../../src/interfaces/users/index";

declare global {
  namespace Express {
    interface Request {
      userEmail: string;
      toEdit: IEditUserProps;
      newUser: ICreateUser;
    }
  }
}
