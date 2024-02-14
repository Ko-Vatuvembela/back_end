import { BaseModel, beforeSave, beforeUpdate, column } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import { capitalize } from 'App/utils/utils';

export default class Utilizador extends BaseModel {
  public static get table() {
    return 'utilizadores';
  }

  @column({ isPrimary: true })
  public uid: number;

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
  public static async sanitize(utilizador: Utilizador) {
    utilizador.email = utilizador.email.toLocaleLowerCase().trim();
    utilizador.nome = capitalize(utilizador.nome).trim();
    utilizador.sobrenome = capitalize(utilizador.sobrenome).trim();
    if (!utilizador.foto) {
      utilizador.foto = 'default.svg';
    }
    if (Hash.needsReHash(utilizador.password)) {
      utilizador.password = await Hash.make(utilizador.password);
    }
  }
  @beforeUpdate()
  public static async checkHash({ password }: Utilizador) {
    if (Hash.needsReHash(password)) {
      password = await Hash.make(password);
    }
  }
}
