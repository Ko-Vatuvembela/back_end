import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Significado from 'App/Models/Significado';
import { DictionaryServices } from 'App/Services/DictionaryServices';
import DictionaryIDValidator from 'App/Validators/DictionaryIDValidator';
import DictionaryParamsValidator from 'App/Validators/DictionaryParamsValidator';
import DictionaryValidator from 'App/Validators/DictionaryValidator ';
import UpdateDictionaryValidator from 'App/Validators/UpdateDictionaryValidator';

const dictionaryServices = new DictionaryServices();

export default class DictionaryController {
  public create = async ({ request, response, auth }: HttpContextContract) => {
    const { classeGramaticalFK, exemplo, linguaFK, palavra, significado } = await request.validate(
      DictionaryValidator
    );
    const data = await dictionaryServices.create(
      palavra,
      significado,
      classeGramaticalFK,
      exemplo,
      linguaFK,
      auth.user?.uid
    );
    response.created(data);
  };
  public findWord = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(DictionaryParamsValidator);
    const { idLingua, idPalavra } = params;
    const data = await dictionaryServices.findWord(idLingua, idPalavra);
    console.log(data);
    if (data) {
      response.ok(data);
      return;
    }
    return response.notFound();
  };
  public updateWord = async ({ request, response }: HttpContextContract) => {
    const { params, significados, palavra } = await request.validate(UpdateDictionaryValidator);
    const { idLingua, idPalavra } = params;
    Promise.all([
      await dictionaryServices.updateWord(idLingua, idPalavra, palavra as string),
      await dictionaryServices.updateMeaning(significados as Array<Significado>),
    ]);
    return response.ok({});
  };
  public deleteWord = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(DictionaryIDValidator);
    if (await dictionaryServices.deleteWord(params.idPalavra)) {
      return response.ok({});
    }
    response.notFound();
  };
}
