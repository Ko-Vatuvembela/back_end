import Database from '@ioc:Adonis/Lucid/Database';
import Utilizador from 'App/Models/Utilizador';
import { UserType } from 'App/types/types';

export class UserServices {
  public checkIfPKExists = async (uid: string) => {
    Database.from(Utilizador.table).select('username').where({ username: uid });
  };

  public getUserByPK = async (uid: string) => {
    const payload = await Utilizador.findBy('username', uid);
    if (payload) {
      return this.mapUserType(payload);
    }
    return null;
  };

  public newUser = async (utilizador: Utilizador) => {
    Utilizador.create(utilizador);
  };

  public updateUser = async (uid: string, utilizador: Utilizador) => {
    Utilizador.updateOrCreate({ username: uid }, utilizador);
  };

  public deleteUser = async (uid: string) => {
    Database.from(Utilizador.table).delete().where({ username: uid });
  };

  public mapUserType = (user: Utilizador) => {
    const mappedUser: UserType = {
      email: user.email,
      name: user.nome,
      photo: user.foto,
      surname: user.sobrenome,
      username: user.username,
    };
    return mappedUser;
  };
}
