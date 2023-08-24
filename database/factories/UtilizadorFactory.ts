import Utilizador from 'App/Models/Utilizador';
import Factory from '@ioc:Adonis/Lucid/Factory';

export default Factory.define(Utilizador, ({ faker }) => {
  return {
    uid: Number(faker.number),
    email: faker.internet.email(),
    foto: faker.image.avatar(),
    nome: faker.person.firstName(),
    password: faker.internet.password({ length: 64 }),
    sobrenome: faker.person.lastName(),
  };
}).build();
