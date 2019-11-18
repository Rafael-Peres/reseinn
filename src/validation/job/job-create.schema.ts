import * as Joi from 'joi';

export default class CreateJobValidation {
  private schema = Joi.object().keys({
    salary: Joi.string()
      .min(3)
      .max(30)
      .optional(),
    company: Joi.string()
      .min(3)
      .max(30)
      .allow('', null)
      .optional(),
    benefits: Joi.string()
      .min(3)
      .max(50)
      .allow('', null)
      .optional(),
    description: Joi.string()
      .min(11)
      .max(120)
      .required(),
    requiriments: Joi.string()
      .min(3)
      .max(60)
      .required(),
    workSchedule: Joi.string()
      .min(3)
      .max(30)
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
