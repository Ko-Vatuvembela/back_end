import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class UpdateDictionaryValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    params: schema.object().members({
      idPalavra: schema.number([rules.unsigned()]),
      idLingua: schema.number([rules.unsigned()]),
    }),
    palavra: schema.string.optional([rules.minLength(2), rules.maxLength(45)]),
    significados: schema.array().members(
      schema.object().members({
        significado: schema.string.optional([rules.minLength(2), rules.maxLength(100)]),
        exemplo: schema.string.optional([rules.minLength(5), rules.maxLength(255)]),
        classeGramaticalFK: schema.number.optional([rules.unsigned()]),
        idSignificado: schema.number.optional([rules.unsigned()]),
      })
    ),
  });
}
