import * as Joi from 'joi';

export default class UpdateJobValidation {
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
      .optional(),
    requiriments: Joi.string()
      .min(3)
      .max(60)
      .optional(),
    workSchedule: Joi.string()
      .min(3)
      .max(30)
      .allow('', null)
      .optional(),
    city: Joi.string()
      .min(3)
      .max(30)
      .optional(),
    state: Joi.string()
      .min(3)
      .max(30)
      .optional(),
  });

  public async validate(body): Promise<any> {
    return Joi.validate(body, this.schema);
  }
}
