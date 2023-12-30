import * as yup from "yup";
import bcrypt from "bcrypt";
import { SchemaOf } from "yup";
import { IEditUserSchema } from "../../interfaces/schemas";
import { IAddress } from "../../interfaces/users";

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

const editUserSchema: SchemaOf<IEditUserSchema> = yup.object().shape({
  name: yup.string(),
  userName: yup.string(),
  email: yup.string(),
  password: yup
    .string()
    .min(6, "password must have at least 6 characters")
    .transform((password: string) => bcrypt.hashSync(password, 10)),
  age: yup.number(),
  gender: yup.string(),
  phone: yup.string(),
  address: addressSchema,
  clubId: yup.number(),
  club: yup.object(),
  partnershipId: yup.number(),
  partnership: yup.object(),
  isAdm: yup.boolean(),
  checker: yup
    .boolean()
    .when(
      [
        "name",
        "userName",
        "email",
        "password",
        "age",
        "gender",
        "phone",
        "address",
        "clubId",
        "partnershipId",
        "isAdm",
      ],
      {
        is: (
          name: string,
          userName: string,
          email: string,
          password: string,
          age: number,
          gender: string,
          phone: string,
          address: IAddress,
          clubId: number,
          partnershipId: number,
          isAdm: boolean
        ) =>
          !!name ||
          !!userName ||
          !!email ||
          !!password ||
          !!age ||
          !!gender ||
          !!phone ||
          !!address ||
          !!clubId ||
          !!partnershipId ||
          !!isAdm,
        then: yup.boolean(),
        otherwise: yup
          .boolean()
          .required("At least one information must be provided."),
      }
    ),
});

export default editUserSchema;
