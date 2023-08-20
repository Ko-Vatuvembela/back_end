import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import { capitalize } from 'App/utils/utils';

export default class Utilizador extends BaseModel {
  public static get table() {
    return 'utilizadores';
  }

  @column({ isPrimary: true })
  public uid: string;

  @column()
  public nome: string;

  @column()
  public ativada: boolean;

  @column()
  public sobrenome: string;

  @column()
  public email: string;

  @column()
  public foto: string;

  @column()
  public password: string;

  @beforeSave()
  public static lowerCase(utilizador: Utilizador) {
    utilizador.email = utilizador.email.toLocaleLowerCase().trim();
    utilizador.nome = capitalize(utilizador.nome).trim();
    utilizador.sobrenome = capitalize(utilizador.sobrenome).trim();
    utilizador.foto = 'default_foto.jng';
  }
  public static async hashPassword(utilizador: Utilizador) {
    if (utilizador.$dirty.password) {
      utilizador.password = await Hash.make(utilizador.password);
    }
  }
}
