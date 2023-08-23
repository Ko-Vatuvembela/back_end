import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Utilizador from './Utilizador';

export default class Relatorio extends BaseModel {
  @column({ isPrimary: true })
  public utilizadorFK: number;

  @column()
  public quantidadePostGramatica: number;

  @column()
  public quantidadePostPoema: number;

  @column()
  public quantidadePostDicionario: number;

  @column()
  public quantidadePostProverbio: number;

  @belongsTo(() => Utilizador, { foreignKey: 'utilizadorFK' })
  public uid: BelongsTo<typeof Utilizador>;
}
