import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import { eraseTable } from 'App/utils/utils';
import ClasseGramatical from 'App/Models/ClasseGramatical';

export default class extends BaseSeeder {
  public async run() {
    Promise.all([
      await eraseTable(ClasseGramatical.table),
      await ClasseGramatical.create({ classeGramatical: 'Substantivo' }),
      await ClasseGramatical.create({ classeGramatical: 'Verbo' }),
      await ClasseGramatical.create({ classeGramatical: 'Adjetivo' }),
      await ClasseGramatical.create({ classeGramatical: 'Pronome' }),
      await ClasseGramatical.create({ classeGramatical: 'Artigo' }),
      await ClasseGramatical.create({ classeGramatical: 'Numeral' }),
      await ClasseGramatical.create({ classeGramatical: 'Preposição' }),
      await ClasseGramatical.create({ classeGramatical: 'Conjunção' }),
      await ClasseGramatical.create({ classeGramatical: 'Interjeição' }),
      await ClasseGramatical.create({ classeGramatical: 'Advérbio' }),
    ]);
  }
}
