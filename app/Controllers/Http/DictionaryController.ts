import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ClasseGramatical from 'App/Models/ClasseGramatical';
import Significado from 'App/Models/Significado';
import { DictionaryServices } from 'App/Services/DictionaryServices';
import DictionaryIDValidator from 'App/Validators/DictionaryIDValidator';
import DictionaryParamsValidator from 'App/Validators/DictionaryParamsValidator';
import DictionaryValidator from 'App/Validators/DictionaryValidator ';
import LanguageIDParamValidator from 'App/Validators/LanguageIDParamValidator';
import SearchWordValidator from 'App/Validators/SearchWordValidator';
import UpdateDictionaryValidator from 'App/Validators/UpdateDictionaryValidator';

const dictionaryServices = new DictionaryServices();

export default class DictionaryController {
  public create = async ({ request, response, auth }: HttpContextContract) => {
    const { classeGramatical, exemplo, linguaFK, pronuncia, palavra, significado } =
      await request.validate(DictionaryValidator);

    const id = await ClasseGramatical.query().where({ classeGramatical });
    if (id[0]) {
      const { idClasseGramatical } = id[0];
      const data = await dictionaryServices.create(
        palavra,
        pronuncia,
        significado,
        idClasseGramatical,
        exemplo,
        linguaFK,
        auth.user?.uid
      );
      return response.created(data);
    }
    response.unprocessableEntity();
  };
  public findWord = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(DictionaryParamsValidator);
    const { idPalavra } = params;
    const data = await dictionaryServices.findWord(idPalavra);
    if (data) {
      response.ok(data);
      return;
    }
    return response.notFound();
  };
  public getWordsByLetter = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(LanguageIDParamValidator);
    const { idLingua, initial } = params;
    const data = await dictionaryServices.getWordsByLetter(idLingua, initial[0].toUpperCase());
    response.ok(data);
  };
  public searchWord = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(SearchWordValidator);
    const { payload } = params;
    const data = await dictionaryServices.searchWord(payload.toLocaleLowerCase());
    response.ok({ data });
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
