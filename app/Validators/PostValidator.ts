import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';
import { categorias } from 'App/utils/utils';
export default class PostValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    conteudo: schema.string(),
    titulo: schema.string(),
    categoria: schema.enum(categorias),
    linguaFK: schema.number([rules.unsigned()]),
  });
}
