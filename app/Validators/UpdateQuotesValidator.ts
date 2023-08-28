import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class UpdateQuotesValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    params: schema.object().members({
      idProverbio: schema.number([rules.unsigned()]),
    }),
    proverbio: schema.string.optional([rules.escape()]),
    explicacao: schema.string.optional([rules.escape()]),
    linguaFK: schema.number([rules.unsigned()]),
  });
}
