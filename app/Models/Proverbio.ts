import { BaseModel, BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Lingua from './Lingua';
import Utilizador from './Utilizador';
import { getDate } from 'App/types/utils/utils';

export default class Proverbio extends BaseModel {
  @column({ isPrimary: true })
  public idProverbio: number;

  @column()
  public proverbio: string;

  @column()
  public explicacao: string;

  @column()
  public data: string;

  @column()
  public linguaFK: number;

  @column()
  public utilizadorFK: number;

  @belongsTo(() => Utilizador, { foreignKey: 'utilizadorFK' })
  public uid: BelongsTo<typeof Utilizador>;

  @belongsTo(() => Lingua, { foreignKey: 'linguaFK' })
  public id: BelongsTo<typeof Lingua>;

  @beforeSave()
  public static async setData(proverbio: Proverbio) {
    proverbio.data = getDate();
  }
}
