import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class ForgotPasswordValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    email: schema.string.optional([
      rules.email(),
      rules.normalizeEmail({ allLowercase: true, gmailRemoveDots: true }),
      rules.trim(),
    ]),
  });
}
