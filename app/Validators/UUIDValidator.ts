import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class UUIDValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    params: schema.object().members({
      uid: schema.string([rules.uuid({ version: 4 }), rules.escape(), rules.trim()]),
    }),
  });
}
