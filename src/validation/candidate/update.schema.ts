import * as Joi from 'joi';

export default class UpdateCandidateValidation {
  private schema = Joi.object().keys({
    profession: Joi.string()
      .min(1)
      .max(50)
      .optional(),
    levelTraining: Joi.string()
      .min(1)
      .max(32)
      .optional(),
    pretense: Joi.string()
      .min(1)
      .max(32)
      .optional(),
  });

  public async validate(body): Promise<any> {
    return Joi.validate(body, this.schema);
  }
}
