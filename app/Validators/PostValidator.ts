import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';
import { categorias, tipoBibliografia } from 'App/utils/utils';
export default class PostValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    conteudo: schema.string(),
    titulo: schema.string(),
    bibliografia: schema.object().members({
      tipo: schema.enum(tipoBibliografia),
      titulo: schema.string(),
      nomeAutor: schema.string(),
      sobrenomeAutor: schema.string(),
      editora: schema.string(),
      edicao: schema.number([rules.range(1, 500)]),
    }),
    categoria: schema.enum(categorias),
    linguaFK: schema.number([rules.unsigned()]),
  });
}
