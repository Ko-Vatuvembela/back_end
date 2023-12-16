import { LanguageServices } from 'App/Services/LanguageServices';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Lingua from 'App/Models/Lingua';
import { eraseTable } from 'App/utils/utils';

const languagesServices = new LanguageServices();

export default class extends BaseSeeder {
  public async run() {
    Promise.all([
      await eraseTable(Lingua.table),
      await languagesServices.createLanguage('Kimbundu'),
      await languagesServices.createLanguage('Cokwé'),
      await languagesServices.createLanguage('Umbundu'),
      await languagesServices.createLanguage('Ngangela'),
      await languagesServices.createLanguage('Ocikwanyama'),
      await languagesServices.createLanguage('Kikongo'),
      await languagesServices.createLanguage('Lingala'),
      await languagesServices.createLanguage('Fiote'),
      await languagesServices.createLanguage('Ibinda'),
    ]);
  }
}
