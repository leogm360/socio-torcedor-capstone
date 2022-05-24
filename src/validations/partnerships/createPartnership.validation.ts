import * as yup from "yup";

const createPartnershipSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("name is required"),
        price: yup.number().required("price is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default createPartnershipSchema;
