import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import UtilizadorFactory from 'Database/factories/UtilizadorFactory';

test.group('Testar a funcionalidades relacionadas ao utilizador', (group) => {
  group.each.setup(async () => await Database.beginGlobalTransaction());
  group.each.teardown(async () => await Database.rollbackGlobalTransaction());

  test('Criar um utilizador', async ({ client }) => {
    const utilizador = await UtilizadorFactory.create();
    // console.log(utilizador.$attributes);
    const response = await client.post('/api/user').json(utilizador);
    response.assertStatus(201);
  });

  // test('Procurar um utilizador pelo username', async ({ client }) => {
  //   const response = await client.get(`/api/user/${user.username}`).json(user);
  //   response.assertStatus(200);
  // });
});
