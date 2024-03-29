import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class SearchWordValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    params: schema.object().members({
      payload: schema.string([rules.alpha(), rules.escape(), rules.trim()]),
    }),
  });
}
