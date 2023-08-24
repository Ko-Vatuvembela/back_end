import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Lingua from './Lingua';
import Utilizador from './Utilizador';

export default class Proverbio extends BaseModel {
  @column({ isPrimary: true })
  public idProverbio: number;

  @column()
  public proverbio: string;

  @column()
  public explicacao: string;

  @column()
  public data: Date;

  @column()
  public linguaFK: number;

  @column()
  public utilizadorFK: number;

  @belongsTo(() => Utilizador, { foreignKey: 'utilizadorFK' })
  public uid: BelongsTo<typeof Utilizador>;

  @belongsTo(() => Lingua, { foreignKey: 'linguaFK' })
  public id: BelongsTo<typeof Lingua>;
}
