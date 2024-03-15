import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Lingua from './Lingua';
import Significado from './Significado';

export default class Palavra extends BaseModel {
  @column({ isPrimary: true })
  public idPalavra: number;

  @column()
  public palavra: string;

  @column()
  public pronuncia: string;

  @column()
  public linguaFK: number;

  @belongsTo(() => Lingua, { foreignKey: 'linguaFK' })
  public id: BelongsTo<typeof Lingua>;

  @hasMany(() => Significado, { foreignKey: 'palavraFK' })
  public significados: HasMany<typeof Significado>;
}
