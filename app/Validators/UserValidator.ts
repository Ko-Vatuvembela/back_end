import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class UserValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    username: schema.string([
      rules.unique({ table: 'utilizadores', column: 'username' }),
      rules.minLength(3),
      rules.maxLength(21),
      rules.alphaNum(),
      rules.regex(/([a-zA-Z]+)([a-zA-Z]+|[\d]*)/),
    ]),
    nome: schema.string([rules.minLength(3), rules.maxLength(45)]),
    sobrenome: schema.string([rules.minLength(3), rules.maxLength(45)]),
    foto: schema.string([rules.minLength(4), rules.maxLength(255)]),
    password: schema.string([rules.minLength(6), rules.maxLength(255)]),
    email: schema.string([rules.email(), rules.unique({ table: 'utilizadores', column: 'email' })]),
  });
}
