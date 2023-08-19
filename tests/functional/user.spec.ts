import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { v4 } from 'uuid';
import UtilizadorFactory from 'Database/factories/UtilizadorFactory';

test.group('Testar a funcionalidades relacionadas ao utilizador', (group) => {
  group.each.setup(async () => await Database.beginGlobalTransaction());
  group.each.teardown(async () => await Database.rollbackGlobalTransaction());

  test('Criar um utilizador', async ({ client }) => {
    const utilizador = await UtilizadorFactory.create();
    const response = await client.post('/api/user').json(utilizador);
    response.assertStatus(201);
  });

  test('Procurar um utilizador pelo uid e não encontrar', async ({ client }) => {
    const response = await client.get(`/api/user/${v4()}`);
    response.assertStatus(404);
  });
});
