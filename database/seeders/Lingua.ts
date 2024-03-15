import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Lingua from 'App/Models/Lingua';

const languageList = [
  { lingua: 'Kimbundu' },
  { lingua: 'Cokwé' },
  { lingua: 'Umbundu' },
  { lingua: 'Ngangela' },
  { lingua: 'Oshikwanyama' },
  { lingua: 'Olunyaneka' },
  { lingua: 'Kikongo' },
  { lingua: 'Lingala' },
  { lingua: 'Fiote' },
  { lingua: 'Ibinda' },
];
export default class extends BaseSeeder {
  public async run() {
    await Lingua.updateOrCreateMany('lingua', languageList);
  }
}
