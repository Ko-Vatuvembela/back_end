import { BaseModel, BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Bibliografia from './Bibliografia';
import { capitalize } from 'App/utils/utils';

export default class Tese extends BaseModel {
  public static get table() {
    return 'tese';
  }

  @column({ isPrimary: true })
  public bibliografiaFK: number;

  @column()
  public grau: string;

  @column()
  public nomeInstituicao: string;

  @belongsTo(() => Bibliografia, { foreignKey: 'bibliografiaFK' })
  public idBibliografia: BelongsTo<typeof Bibliografia>;

  @beforeSave()
  public static async sanitize(tese: Tese) {
    tese.nomeInstituicao = capitalize(tese.nomeInstituicao);
  }
}
