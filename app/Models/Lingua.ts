import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Lingua extends BaseModel {
  @column({ isPrimary: true, columnName: 'id_lingua' })
  public id: number;

  @column()
  public lingua: string;
}
