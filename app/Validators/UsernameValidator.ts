import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class UsernameValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    username: schema.string([
      rules.minLength(3),
      rules.maxLength(21),
      rules.alphaNum(),
      rules.trim(),
      rules.regex(/^[a-zA-Z0-9_-]{3,16}$/),
    ]),
  });
}
