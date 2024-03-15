import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class DictionaryValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    significado: schema.string([rules.minLength(2), rules.maxLength(100)]),
    exemplo: schema.string([rules.minLength(5), rules.maxLength(255)]),
    palavra: schema.string([rules.minLength(2), rules.maxLength(45)]),
    pronuncia: schema.string([rules.minLength(2), rules.maxLength(45)]),
    linguaFK: schema.number([rules.unsigned()]),
    classeGramatical: schema.string([rules.minLength(2), rules.maxLength(45)]),
  });
}
