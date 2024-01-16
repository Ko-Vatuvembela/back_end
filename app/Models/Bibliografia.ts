import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Bibliografia extends BaseModel {
  @column({ isPrimary: true })
  public idBibliografia: number;

  @column()
  public nomeAutor: string;

  @column()
  public sobrenomeAutor: string;

  @column()
  public titulo: string;

  @column()
  public ano: number;
}
