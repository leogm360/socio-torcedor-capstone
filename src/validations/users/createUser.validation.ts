import * as yup from "yup";
import bcrypt from "bcrypt";
import { SchemaOf } from "yup";

import { ICreateUser, IAddress } from "../../interfaces/users";

const addressSchema: SchemaOf<IAddress> = yup.object().shape({
  zip_code: yup
    .string()
    .required("zip code is required")
    .length(8, "zip code must contain 8 digits"),
  street: yup.string().required("street is required"),
  number_house: yup.string().required("number_house is required"),
  complement: yup.string(),
  city: yup.string().required("city is required"),
  state: yup.string().required("state is required"),
  country: yup.string().required("country is required"),
});

const createUserSchema: SchemaOf<ICreateUser> = yup.object().shape({
  name: yup.string().required("name is required"),
  userName: yup.string().required("userName is required"),
  email: yup.string().required("email is required"),
  password: yup
    .string()
    .required()
    .min(6, "password must have at least 6 characters")
    .transform((password: string) => bcrypt.hashSync(password, 10)),
  age: yup.number().required("age is required"),
  gender: yup.string().required("gender is required"),
  phone: yup.string().required("phone is required"),
  address: addressSchema,
  clubId: yup.number().required("clubId is required"),
  partnershipId: yup.number().required("partnershipId is required"),
  isAdm: yup.boolean().required("isAdm is required"),
});

export default createUserSchema;
