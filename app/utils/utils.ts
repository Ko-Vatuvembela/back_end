import { faker } from '@faker-js/faker';
import Utilizador from 'App/Models/Utilizador';
import { UserType } from 'App/types/types';
import Mail from '@ioc:Adonis/Addons/Mail';
import mail from 'Config/mail';
import { SendMailType } from 'App/types/types';

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
  const { email, nome, sobrenome, foto, uid } = user;
  const mappedUser: UserType = {
    email,
    nome,
    foto,
    sobrenome,
    uid,
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

export const sendMail = async ({ to, subject }: SendMailType, code: Number) => {
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
