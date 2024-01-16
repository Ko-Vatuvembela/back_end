import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Bibliografia from './Bibliografia';

export default class Artigo extends BaseModel {
  public static get table() {
    return 'artigos';
  }

  @column({ isPrimary: true })
  public idArtigo: number;

  @column({ isPrimary: true })
  public bibliografiaFK: number;

  @column()
  public numeroPaginas: number;

  @belongsTo(() => Bibliografia, { foreignKey: 'bibliografiaFK' })
  public idBibliografia: BelongsTo<typeof Bibliografia>;
}
