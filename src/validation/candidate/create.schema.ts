import * as Joi from 'joi';

export default class CreateCandidateValidation {
  private schema = Joi.object().keys({
    profession: Joi.string()
      .min(1)
      .max(50)
      .required(),
    levelTraining: Joi.string()
      .min(1)
      .max(32)
      .required(),
    pretense: Joi.string()
      .min(1)
      .max(32)
      .required(),
  });

  public async validate(body): Promise<any> {
    return Joi.validate(body, this.schema);
  }
}
