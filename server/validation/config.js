'use strict';

const { yup, validateYupSchemaSync } = require('@strapi/utils');

const configSchema = yup.object().shape({
  chains: yup
    .array()
    .of(
      yup.object({
        network: yup
          .object({
            chainId: yup.number().positive().integer().required(),
            name: yup.string().required(),
          })
          .required(),
        providers: yup
          .array()
          .of(
            yup.object({
              url: yup.string().url().required(),
              user: yup.string(),
              password: yup.string(),
              headers: yup.object(),
            })
          )
          .required()
          .min(1),
        quorum: yup.number().integer().default(1),
      })
    )
    .required()
    .min(1),
  wallet: yup
    .object()
    .shape({
      privateKey: yup.string().required(),
    })
    .optional(),
  auth: yup
    .object()
    .shape({
      keys: yup.array().of(yup.string()).required().min(1),
      domain: yup.string().required(),
    })
    .required(),
});

module.exports = {
  validateConfig: validateYupSchemaSync(configSchema),
};
