import { ObjectSchema } from "yup";

export interface IEditUserSchema {
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
  age?: number;
  gender?: string;
  phone?: string;
  address?: IAddress;
  clubId?: number;
  club?: ObjectSchema;
  partnershipId?: number;
  partnership?: ObjectSchema;
  isAdm?: boolean;
  checker?: boolean;
}
