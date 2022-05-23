import * as express from "express";
import { IEditUserProps } from "../../src/interfaces/users/index";

declare global {
  namespace Express {
    interface Request {
      userEmail: string;
      toEdit: IEditUserProps;
    }
  }
}
