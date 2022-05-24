import * as yup from "yup";

const createUserSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("name is required"),
        userName: yup.string().required("userName is required"),
        email: yup.string().required("email is required"),
        password: yup
          .string()
          .min(6, "password must have at least 6 characters"),
        age: yup.number().required("age is required"),
        phone: yup.number().required("phone is required"),
        address: yup.object().shape({
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
        }),
        club_id: yup.number().required("club_id is required"),
        partnership_id: yup.number().required("partnership_id is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default createUserSchema;
