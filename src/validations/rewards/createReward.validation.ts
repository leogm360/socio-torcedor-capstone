import * as yup from "yup";

const createRewardSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("name is required"),
        description: yup.string().required("description is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default createRewardSchema;
