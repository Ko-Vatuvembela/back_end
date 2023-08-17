import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Utilizador extends BaseModel {
  public static get table() {
    return 'utilizadores';
  }

  @column({ isPrimary: true })
  public username: string;

  @column()
  public nome: string;

  @column()
  public sobrenome: string;

  @column()
  public email: string;

  @column()
  public foto: string;

  @column()
  public password: string;
}
