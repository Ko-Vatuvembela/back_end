import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { LanguageServices } from 'App/Services/LanguageServices';
import LanguageIDValidator from 'App/Validators/LanguageIDValidator';
import LanguageValidator from 'App/Validators/LanguageValidator';
import UpdateLanguageValidator from 'App/Validators/UpdateLanguageValidator';

const languageServices = new LanguageServices();

export default class LanguageController {
  public createLanguage = async ({ response, request }: HttpContextContract) => {
    const { lingua } = await request.validate(LanguageValidator);
    response.created(await languageServices.createLanguage(lingua));
  };
  public getLanguages = async ({ response }: HttpContextContract) => {
    response.ok(await languageServices.getLanguages());
  };
  public getLanguageByID = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(LanguageIDValidator);
    const language = await languageServices.getLanguageByID(params.idLingua);
    if (language) {
      response.ok(language);
      return;
    }
    response.notFound();
  };
  public updateLanguage = async ({ response, request }: HttpContextContract) => {
    const { params, lingua } = await request.validate(UpdateLanguageValidator);
    const idUpdated = await languageServices.updateLanguage(params.idLingua, lingua);
    if (idUpdated) {
      response.ok(idUpdated);
      return;
    }
    response.notFound();
  };
  public deleteLanguage = async ({ response, request }: HttpContextContract) => {
    const { params } = await request.validate(LanguageIDValidator);

    const idDeleted = await languageServices.deleteLanguage(params.idLingua);
    if (idDeleted) {
      response.ok({ message: 'Deleted sucesssfully' });
      return;
    }
    response.notFound();
  };
}
