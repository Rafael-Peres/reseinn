import * as Joi from 'joi';

export default class UpdateRecruiterValidation {
  private schema = Joi.object().keys({
    presentationLetter: Joi.string()
      .min(11)
      .max(120)
      .optional(),
  });

  public async validate(body): Promise<any> {
    return Joi.validate(body, this.schema);
  }
}
