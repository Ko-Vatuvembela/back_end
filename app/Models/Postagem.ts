import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Utilizador from './Utilizador';
import Lingua from './Lingua';

export default class Postagem extends BaseModel {
  @column({ isPrimary: true })
  public idPostagem: string;

  @column()
  public conteudo: string;

  @column()
  public utilizadorFK: string;

  @column()
  public linguaFK: string;

  @belongsTo(() => Utilizador, { foreignKey: 'utilizadorFK' })
  public uid: BelongsTo<typeof Utilizador>;

  @belongsTo(() => Lingua, { foreignKey: 'linguaFK' })
  public idLingua: BelongsTo<typeof Lingua>;
}
