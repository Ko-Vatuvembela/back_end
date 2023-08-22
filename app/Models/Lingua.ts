import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Lingua extends BaseModel {
  @column({ isPrimary: true })
  public idLingua: number;

  @column()
  public lingua: string;
}
