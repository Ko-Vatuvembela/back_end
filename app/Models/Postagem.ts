import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Utilizador from './Utilizador';
import Lingua from './Lingua';

export default class Postagem extends BaseModel {
  public static get table() {
    return 'postagens';
  }
  @column({ isPrimary: true })
  public idPostagem: number;

  @column()
  public conteudo: string;

  @column()
  public utilizadorFK: number;

  @column()
  public linguaFK: number;

  @belongsTo(() => Utilizador, { foreignKey: 'utilizadorFK' })
  public uid: BelongsTo<typeof Utilizador>;

  @belongsTo(() => Lingua, { foreignKey: 'linguaFK' })
  public idLingua: BelongsTo<typeof Lingua>;
}
