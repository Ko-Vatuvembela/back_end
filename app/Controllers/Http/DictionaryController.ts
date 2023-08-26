import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DictionaryServices } from 'App/Services/DictionaryServices';
import DictionaryParamsValidator from 'App/Validators/DictionaryParamsValidator';
import DictionaryValidator from 'App/Validators/DictionaryValidator ';

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
    if (data) {
      response.ok(data);
      return;
    }
    return response.notFound();
  };
}
