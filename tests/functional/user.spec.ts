import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { UserType } from 'App/types/types';

let user: UserType = {
  email: 'roddas360@gmail.com',
  nome: 'Rodolfo',
  foto: 'https://avatars.githubusercontent.com/u/9947506?v=4',
  sobrenome: 'Neves',
  username: 'roddascabral',
  password: 'djfaodfhjoqwsd3432sd',
};

test.group('Testar a funcionalidades relacionadas ao utilizador', (group) => {
  group.each.setup(async () => await Database.beginGlobalTransaction());
  group.each.teardown(async () => await Database.rollbackGlobalTransaction());

  test('Criar um utilizador', async ({ client }) => {
    const response = await client.post('/api/user').json(user);
    response.assertStatus(201);
  });

  test('Retorna os dados do usuário pelo username', async ({ client }) => {
    const response = await client.get('/api/user/' + user.username);
    response.assertStatus(202);
  });
});
