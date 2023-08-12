import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Utilizador from './Utilizador';

export default class Relatorio extends BaseModel {
  @column({ isPrimary: true })
  public utilizadorFK: string;

  @column()
  public quantidadePostGramatica: number;

  @column()
  public quantidadePostPoema: number;

  @column()
  public quantidadePostDicionario: number;

  @column()
  public quantidadePostProverbio: number;

  @belongsTo(() => Utilizador, { foreignKey: 'utilizadorFK' })
  public username: BelongsTo<typeof Utilizador>;
}