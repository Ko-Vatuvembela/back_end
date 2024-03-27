import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';
import { categorias } from 'App/types/utils/utils';
export default class LanguageIDValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    params: schema.object().members({
      categoria: schema.enum(categorias),
      lingua: schema.number([rules.unsigned()]),
    }),
  });
}
