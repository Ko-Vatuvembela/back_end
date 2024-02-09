import { faker } from '@faker-js/faker';
import Utilizador from 'App/Models/Utilizador';
import { UserType } from 'App/types/types';
import Mail from '@ioc:Adonis/Addons/Mail';
import mail from 'Config/mail';
import { SendMailType } from 'App/types/types';
import Database from '@ioc:Adonis/Lucid/Database';

export const getDate = () => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
export function setRandomPassword(email: string) {
  let ret = '';
  for (let i = 1; i < email.indexOf('@'); i++) {
    ret += (i & 1) === 0 ? Math.floor(Math.random() * i * 100) : email[i];
  }
  ret += email[0];
  return ret;
}
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
  const { email, nome, sobrenome, foto, uid, ativada } = user;
  const mappedUser: UserType = {
    email,
    ativada: Boolean(ativada),
    nome,
    foto,
    sobrenome,
    uid,
  };
  return mappedUser;
};
export const eraseTable = async (table: string) => {
  await Database.rawQuery(`delete from ${table} where true`);
};
export const capitalize = (str: string) => {
  let ret = '';
  ret += str[0].toUpperCase();
  for (let i = 1; i < str.length; i++) {
    ret += str[i].toLocaleLowerCase();
  }
  return ret;
};

export const sendMail = async ({ to, subject }: SendMailType, code: Number | string) => {
  await Mail.send((message) => {
    const sender = mail.mailers.smtp.auth.user;
    message.from(sender).to(to).subject(subject).htmlView('emails/reset', {
      code,
    });
  });
};

export const getRandomNumbers = (): Number => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    const n = Number(Math.random() * 5345543);
    num += String(n - 1 ? n : 9)[0];
  }
  return Number(num);
};
export const categorias = ['Fonologia', 'Morfologia', 'Sintaxe', 'Diversos'];
export const niveis = ['Bacharelado/Licenciatura', 'Mestrado', 'Doutorado'];
export const tipoBibliografia = ['Artigo', 'Tese', 'Livro'];
export const ALL_LANGUAGES = 200;
