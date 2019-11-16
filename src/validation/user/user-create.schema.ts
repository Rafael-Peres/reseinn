import * as Joi from 'joi';
import { Gender } from '../../enums/gender.enum';

export default class UserValidation {
  private schema = Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
    socialName: Joi.string()
      .min(3)
      .max(30)
      .allow('', null)
      .optional(),
    fullName: Joi.string()
      .min(3)
      .max(50)
      .allow('', null)
      .optional(),
    document: Joi.string()
      .min(11)
      .max(14)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    admin: Joi.boolean().optional(),
    password: Joi.string()
      .min(6)
      .max(12)
      .required(),
    crmCode: Joi.string()
      .min(3)
      .max(12)
      .allow('', null)
      .optional(),
    gender: Joi.string()
      .valid(Gender.Female, Gender.Male)
      .allow('', null)
      .optional(),
    preferences: Joi.object()
      .allow('', null)
      .optional(),
  });

  public async validate(body): Promise<any> {
    return Joi.validate(body, this.schema);
  }
}
