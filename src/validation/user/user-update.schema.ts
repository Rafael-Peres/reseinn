import * as Joi from 'joi';
import { Gender } from '../../enums/gender.enum';

export default class UserUpdateValidation {
  private schema = Joi.object().keys({
    username: Joi.string()
      .allow('', null)
      .min(3)
      .max(30)
      .optional(),
    socialName: Joi.string()
      .allow('', null)
      .min(3)
      .max(30)
      .optional(),
    fullName: Joi.string()
      .allow('', null)
      .min(3)
      .max(50)
      .optional(),
    admin: Joi.boolean().optional(),
    document: Joi.string()
      .allow('', null)
      .min(11)
      .max(14)
      .optional(),
    email: Joi.string()
      .allow('', null)
      .email()
      .optional(),
    password: Joi.string()
      .min(6)
      .max(12)
      .allow('', null)
      .optional(),
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
    return await Joi.validate(body, this.schema);
  }
}
