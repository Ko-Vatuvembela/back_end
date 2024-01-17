import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Bibliografia from './Bibliografia';

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
}
