import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import ClasseGramatical from 'App/Models/ClasseGramatical';

const list = [
  { classeGramatical: 'Substantivo' },
  { classeGramatical: 'Verbo' },
  { classeGramatical: 'Adjetivo' },
  { classeGramatical: 'Pronome' },
  { classeGramatical: 'Artigo' },
  { classeGramatical: 'Numeral' },
  { classeGramatical: 'Preposição' },
  { classeGramatical: 'Conjunção' },
  { classeGramatical: 'Interjeição' },
  { classeGramatical: 'Advérbio' },
];

export default class extends BaseSeeder {
  public async run() {
    await ClasseGramatical.updateOrCreateMany('classeGramatical', list);
  }
}
