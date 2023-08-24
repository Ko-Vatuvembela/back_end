import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ClasseGramaticalValidator from 'App/Validators/ClasseGramaticalValidator';
import { ClasseGramaticalService } from 'App/Services/ClasseGramaticalService';
import UpdateClasseGramaticalValidator from 'App/Validators/UpdateClasseGramaticalValidator';
import ClasseGramaticalIDValidator from 'App/Validators/ClasseGramaticalIDValidator';

const classeGramaticalServices = new ClasseGramaticalService();

export default class ClasseGramaticalsController {
  public insert = async ({ request, response }: HttpContextContract) => {
    const { classeGramatical } = await request.validate(ClasseGramaticalValidator);
    response.created(await classeGramaticalServices.insert(classeGramatical));
  };
  public getAll = async ({ response }: HttpContextContract) => {
    response.ok(await classeGramaticalServices.getAll());
  };
  public update = async ({ response, request }: HttpContextContract) => {
    const { classeGramatical, params } = await request.validate(UpdateClasseGramaticalValidator);
    if (await classeGramaticalServices.update(params.id, classeGramatical)) {
      response.ok({ classeGramatical });
      return;
    }
    response.notFound();
  };
  public delete = async ({ response, request }: HttpContextContract) => {
    const { params } = await request.validate(ClasseGramaticalIDValidator);
    if (await classeGramaticalServices.delete(params.id)) {
      response.ok({});
      return;
    }
    response.notFound();
  };
  public getById = async ({ response, request }: HttpContextContract) => {
    const { params } = await request.validate(ClasseGramaticalIDValidator);
    const classeGramatical = await classeGramaticalServices.findById(params.id);
    if (classeGramatical) {
      response.ok(classeGramatical);
      return;
    }
    response.notFound();
  };
}
