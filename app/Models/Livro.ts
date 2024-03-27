import { BaseModel, BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Bibliografia from './Bibliografia';
import { capitalize } from 'App/types/utils/utils';

export default class Livro extends BaseModel {
  public static get table() {
    return 'livros';
  }

  @column({ isPrimary: true })
  public bibliografiaFK: number;

  @column()
  public editora: string;

  @column()
  public localPublicacao: string;

  @column()
  public edicao: number;

  @belongsTo(() => Bibliografia, { foreignKey: 'bibliografiaFK' })
  public idBibliografia: BelongsTo<typeof Bibliografia>;

  @beforeSave()
  public static async sanitize(livro: Livro) {
    livro.localPublicacao = capitalize(livro.localPublicacao);
  }
}
