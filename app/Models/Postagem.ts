import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Utilizador from './Utilizador';
import Lingua from './Lingua';
import Bibliografia from './Bibliografia';

export default class Postagem extends BaseModel {
  public static get table() {
    return 'postagens';
  }
  @column({ isPrimary: true })
  public idPostagem: number;

  @column()
  public conteudo: string;

  @column()
  public titulo: string;

  @column()
  public categoria: string;

  @column()
  public utilizadorFK: number;

  @column()
  public linguaFK: number;

  @column()
  public bibliografiaFK: number;

  @belongsTo(() => Utilizador, { foreignKey: 'utilizadorFK' })
  public uid: BelongsTo<typeof Utilizador>;

  @belongsTo(() => Bibliografia, { foreignKey: 'bibliografiaFK' })
  public idBibliografia: BelongsTo<typeof Bibliografia>;

  @belongsTo(() => Lingua, { foreignKey: 'linguaFK' })
  public idLingua: BelongsTo<typeof Lingua>;
}
