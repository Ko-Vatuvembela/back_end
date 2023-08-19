import { validator } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class BaseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public messages = {
    minLength: 'O campo {{field}} deve conter no mínimo {{options.minLength}} caracteres',
    maxLength: 'O campo {{field}} deve conter no máximo {{options.minLength}} caracteres',
    required: 'O campo {{field}} é obrigatório',
    unique: 'O campo {{field}} é único e é existente',
    regex: 'O campo {{field}} ñ condiz com a regex',
  };
  public reporter = validator.reporters.api;
  public cacheKey = this.ctx.routeKey;
}
