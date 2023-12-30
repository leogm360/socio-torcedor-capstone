import * as yup from "yup";

const updateRewardSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string(),
        description: yup.string(),
        checker: yup.boolean().when(["name", "description"], {
          is: (name: string, description: string) => !!name || !!description,
          then: yup.boolean(),
          otherwise: yup
            .boolean()
            .required("Either name, description must be provided."),
        }),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default updateRewardSchema;
