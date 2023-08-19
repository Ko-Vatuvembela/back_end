import { faker } from '@faker-js/faker';
import Utilizador from 'App/Models/Utilizador';
import { UserType } from 'App/types/types';

export const debug = (value: any) => {
  console.log('============ BEGIN DEBUG ============');
  console.log(value);
  console.log('============ END DEBUG ============');
};
export const createFakeUser = (): UserType => ({
  email: faker.internet.email(),
  nome: faker.person.firstName(),
  password: faker.internet.password({ length: 64 }),
  sobrenome: faker.person.lastName(),
});
export const mapUserType = (user: Utilizador) => {
  const { email, nome, sobrenome, password, foto, uid } = user;
  const mappedUser: UserType = {
    email,
    nome,
    foto,
    sobrenome,
    uid,
    password,
  };
  return mappedUser;
};
export const capitalize = (str: string) => {
  let ret = '';
  ret += str[0].toUpperCase();
  for (let i = 1; i < str.length; i++) {
    ret += str[i].toLocaleLowerCase();
  }
  return ret;
};
