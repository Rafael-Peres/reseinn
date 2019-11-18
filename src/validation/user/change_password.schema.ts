import * as Joi from 'joi';

export default class ChangePasswordValidation {
  private schema = Joi.object().keys({
    currentPassword: Joi.string()
      .min(3)
      .max(30)
      .required(),
    newPassword: Joi.string()
      .min(3)
      .max(30)
      .required(),
    confirmation: Joi.string()
      .min(3)
      .max(30)
      .required(),
  });

  public async validate(body): Promise<any> {
    return Joi.validate(body, this.schema);
  }
}
