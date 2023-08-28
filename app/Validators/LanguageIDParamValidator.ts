import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class LanguageIDParamValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    params: schema.object().members({
      idLingua: schema.number([rules.unsigned()]),
      initial: schema.string([rules.alpha(), rules.escape(), rules.maxLength(1)]),
    }),
  });
}
