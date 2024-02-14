import { schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseValidator from './BaseValidator';

export default class ImageValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    foto: schema.file.optional({
      extnames: ['jpg', 'jpeg', 'png'],
    }),
  });
}
