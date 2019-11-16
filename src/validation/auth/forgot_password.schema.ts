import * as Joi from 'joi';

export default class ForgotPasswordValidation {
  private schema = Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
    document: Joi.string()
      .min(11)
      .max(14)
      .required(),
    email: Joi.string()
      .email()
      .required(),
  });

  public async validate(body): Promise<any> {
    return await Joi.validate(body, this.schema);
  }
}
