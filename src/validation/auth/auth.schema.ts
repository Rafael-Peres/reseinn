import * as Joi from 'joi';

export default class AuthValidation {
  private schema = Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(6)
      .max(12)
      .required(),
  });

  public async validate(body): Promise<any> {
    return await Joi.validate(body, this.schema);
  }
}
