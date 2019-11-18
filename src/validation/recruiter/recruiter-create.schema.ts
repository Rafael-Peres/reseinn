import * as Joi from 'joi';

export default class CreateRecruiterValidation {
  private schema = Joi.object().keys({
    presentationLetter: Joi.string()
      .min(11)
      .max(120)
      .required(),
  });

  public async validate(body): Promise<any> {
    return Joi.validate(body, this.schema);
  }
}
