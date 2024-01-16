import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Bibliografia from './Bibliografia';

export default class Livro extends BaseModel {
  public static get table() {
    return 'livros';
  }

  @column({ isPrimary: true })
  public idLivro: number;

  @column({ isPrimary: true })
  public bibliografiaFK: number;

  @column()
  public editora: string;

  @column()
  public sobrenomeAutor: string;

  @column()
  public titulo: string;

  @column()
  public ano: number;

  @belongsTo(() => Bibliografia, { foreignKey: 'bibliografiaFK' })
  public idBibliografia: BelongsTo<typeof Bibliografia>;
}
