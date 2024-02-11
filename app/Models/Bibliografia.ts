import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import { capitalize } from 'App/utils/utils';

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
  public tipo: string;

  @column()
  public sobrenomeAutor: string;

  @column()
  public ano: number;

  @beforeSave()
  public static async sanitize(bibliografia: Bibliografia) {
    bibliografia.nomeAutor = capitalize(bibliografia.nomeAutor);
    bibliografia.sobrenomeAutor = bibliografia.sobrenomeAutor.toUpperCase();
    bibliografia.titulo = capitalize(bibliografia.titulo);
  }
}
