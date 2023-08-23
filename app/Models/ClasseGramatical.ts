import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class ClasseGramatical extends BaseModel {
  @column({ isPrimary: true })
  public idClasseGramatical: number;

  @column()
  public classeGramatical: string;
}
