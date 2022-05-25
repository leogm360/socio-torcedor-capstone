import * as yup from "yup";

const updatePartnershipSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string(),
        price: yup.number(),
        rewards_id: yup.array(),
        checker: yup.boolean().when(["name", "price", "rewards_id"], {
          is: (name: string, price: number, rewards_id: number[]) =>
            !!name || !!price || !!rewards_id,
          then: yup.boolean(),
          otherwise: yup
            .boolean()
            .required("Either name, price or rewards_id must be provided."),
        }),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default updatePartnershipSchema;
