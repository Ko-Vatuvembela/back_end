import Database from '@ioc:Adonis/Lucid/Database';
import Utilizador from 'App/Models/Utilizador';
import { UpdateUserType, UserType } from 'App/types/types';
import { mapUserType } from 'App/utils/utils';

const TABLE_NAME = Utilizador.table;

export class UserServices {
  public checkIfPKExists = async (uid: string) => {
    Database.from(TABLE_NAME).select('username').where({ username: uid });
  };

  public checkIfEmailExists = async (email: string): Promise<boolean> => {
    const userEmail = await Database.from(TABLE_NAME).select('email').where({ email });
    return userEmail.length > 0;
  };
  public getUserPKByEmail = async (email: string) => {
    const pk = await Database.from(TABLE_NAME).select('uid').where('email', email);
    return pk[0].uid;
  };
  public getUserByPK = async (uid: string) => {
    const payload = await Utilizador.findBy('uid', uid);
    if (payload) {
      return mapUserType(payload);
    }
    return null;
  };

  public createUser = async (utilizador: UserType) => {
    const { $attributes } = await Utilizador.create(utilizador);
    return $attributes;
  };

  public updateUser = async (uid: string, utilizador: UpdateUserType) => {
    return Utilizador.updateOrCreate({ uid }, utilizador);
  };

  public deleteUser = async (uid: string) => {
    Database.from(Utilizador.table).delete().where({ username: uid });
  };
}
