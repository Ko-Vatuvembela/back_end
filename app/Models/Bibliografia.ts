import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Bibliografia extends BaseModel {
  public static get table() {
    return 'bibliografias';
  }
  @column({ isPrimary: true })
  public idBibliografia: number;

  @column()
  public titulo: string;

  @column()
  public nomeAutor: string;

  @column()
  public sobrenomeAutor: string;

  @column()
  public ano: number;
}
