import * as yup from "yup";

const createClubSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("name is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default createClubSchema;
