import * as Joi from 'joi';
import { Gender } from '../../enums/gender.enum';

export default class CreateUserValidation {
  private schema = Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
    fullName: Joi.string()
      .min(3)
      .max(50)
      .allow('', null)
      .required(),
    document: Joi.string()
      .min(11)
      .max(14)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    birthDate: Joi.string()
      .min(6)
      .max(12)
      .required(),
    password: Joi.string()
      .min(6)
      .max(12)
      .required(),
    gender: Joi.string()
      .valid(Gender.Female, Gender.Male, Gender.Others)
      .allow('', null)
      .optional(),
    city: Joi.string()
      .min(3)
      .max(30)
      .required(),
    state: Joi.string()
      .min(3)
      .max(30)
      .required(),
  });

  public async validate(body): Promise<any> {
    return Joi.validate(body, this.schema);
  }
}
