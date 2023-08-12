import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Lingua from './Lingua';
import Utilizador from './Utilizador';

export default class UtilizadorFalaLingua extends BaseModel {
  @column()
  public utilizadorFK: string;

  @column()
  public linguaFK: string;

  @belongsTo(() => Utilizador, { foreignKey: 'utilizadorFK' })
  public username: BelongsTo<typeof Utilizador>;

  @belongsTo(() => Lingua, { foreignKey: 'linguaFK' })
  public idLingua: BelongsTo<typeof Lingua>;
}
