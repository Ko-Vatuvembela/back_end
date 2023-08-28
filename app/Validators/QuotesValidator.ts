import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class QuotesValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    proverbio: schema.string([rules.escape()]),
    explicacao: schema.string([rules.escape()]),
    linguaFK: schema.number(),
  });
}
