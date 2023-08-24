import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class ClasseGramatical extends BaseModel {
  public static get table() {
    return 'classe_gramaticais';
  }

  @column({ isPrimary: true })
  public idClasseGramatical: number;

  @column()
  public classeGramatical: string;
}
