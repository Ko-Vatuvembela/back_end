import { validator } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class BaseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public messages = {
    minLength: 'O valor {{field}} deve conter no mínimo {{options.minLength}} caracteres',
    maxLength: 'O valor {{field}} deve conter no máximo {{options.minLength}} caracteres',
    required: 'O valor {{field}} é obrigatório',
    unique: 'O valor {{field}}  já existe',
    regex: 'O valor {{field}} ñ condiz com a regex',
  };
  public reporter = validator.reporters.api;
  public cacheKey = this.ctx.routeKey;
}
