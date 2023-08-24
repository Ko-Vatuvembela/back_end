import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Lingua from './Lingua';

export default class Palavra extends BaseModel {
  @column({ isPrimary: true })
  public idPalavra: number;

  @column()
  public palavra: string;

  @column()
  public linguaFK: string;

  @belongsTo(() => Lingua, { foreignKey: 'linguaFK' })
  public id: BelongsTo<typeof Lingua>;
}
