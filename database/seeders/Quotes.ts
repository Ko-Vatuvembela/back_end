import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Lingua from 'App/Models/Lingua';
import Proverbio from 'App/Models/Proverbio';
import Utilizador from 'App/Models/Utilizador';
import rawQuotes from '../../app/types/utils/quotes-mocked.json';

export default class extends BaseSeeder {
  public async run() {
    const email = 'dev_developer@outlook.com';
    const user = await Utilizador.findBy('email', email);
    const allLanguages = await Lingua.all();
    const languageID = new Map<string, number>();

    allLanguages.map(({ lingua, id }) => {
      languageID.set(lingua, id);
    });

    const quotesList = rawQuotes.map(({ proverbio, explicacao, data, linguaFK }) => {
      const filterQuote = {
        proverbio,
        explicacao,
        utilizadorFK: user?.uid,
        data,
        linguaFK: languageID.get(linguaFK),
      };
      return filterQuote;
    }) as Proverbio[];
    await Proverbio.updateOrCreateMany('proverbio', quotesList);
  }
}
