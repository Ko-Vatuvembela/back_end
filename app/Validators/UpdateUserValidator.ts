import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';
export default class UpdateUserValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    nome: schema.string.optional([rules.minLength(3), rules.trim(), rules.maxLength(45)]),
    sobrenome: schema.string.optional([rules.minLength(3), rules.trim(), rules.maxLength(45)]),
    password: schema.string.optional([rules.minLength(6), rules.maxLength(255)]),
    email: schema.string.optional([
      rules.email(),
      rules.normalizeEmail({ allLowercase: true, gmailRemoveDots: true }),
      rules.trim(),
    ]),
  });
}
