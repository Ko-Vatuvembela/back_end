import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ClasseGramaticalValidator from 'App/Validators/ClasseGramaticalValidator';
import { ClasseGramaticalService } from 'App/Services/ClasseGramaticalService';

const classeGramaticalServices = new ClasseGramaticalService();

export default class ClasseGramaticalsController {
  public insert = async ({ request, response }: HttpContextContract) => {
    const { classeGramatical } = await request.validate(ClasseGramaticalValidator);
    response.created(await classeGramaticalServices.insert(classeGramatical));
  };
}
