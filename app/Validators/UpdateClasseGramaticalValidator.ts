import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';
export default class UpdateClasseGramaticalValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    classeGramatical: schema.string([rules.trim(), rules.minLength(4), rules.maxLength(20)]),
    params: schema.object().members({
      id: schema.number([rules.unsigned()]),
    }),
  });
}
