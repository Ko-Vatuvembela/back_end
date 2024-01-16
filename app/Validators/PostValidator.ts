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
      ano: schema.number([rules.range(1500, 2024 ** 2)]),
      grau: schema.string.optional(),
      nomeInstituicao: schema.string.optional(),
      numeroPaginas: schema.number.optional([rules.range(1, 10e13)]),
    }),
    categoria: schema.enum(categorias),
    linguaFK: schema.number([rules.unsigned()]),
  });
}
