import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';

export default class Utilizador extends BaseModel {
  public static get table() {
    return 'utilizadores';
  }

  @column({ isPrimary: true })
  public uid: string;

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

  @beforeSave()
  public static async hashPassword(utilizador: Utilizador) {
    if (utilizador.$dirty.password) {
      utilizador.password = await Hash.make(utilizador.password);
    }
  }
}
