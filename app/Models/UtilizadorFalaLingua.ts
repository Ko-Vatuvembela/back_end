import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Lingua from './Lingua';
import Utilizador from './Utilizador';

export default class UtilizadorFalaLingua extends BaseModel {
  @column()
  public utilizadorFK: number;

  @column()
  public linguaFK: number;

  @belongsTo(() => Utilizador, { foreignKey: 'utilizadorFK' })
  public uid: BelongsTo<typeof Utilizador>;

  @belongsTo(() => Lingua, { foreignKey: 'linguaFK' })
  public idLingua: BelongsTo<typeof Lingua>;
}
