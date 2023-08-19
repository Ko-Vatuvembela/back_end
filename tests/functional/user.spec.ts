import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { createFakeUser, debug } from 'App/utils/utils';
import { v4 } from 'uuid';
import { mapUserType } from 'App/utils/utils';
import { faker } from '@faker-js/faker';
import { UserType } from 'App/types/types';

test.group('Testar a funcionalidades relacionadas ao utilizador', (group) => {
  group.each.setup(async () => await Database.beginGlobalTransaction());
  group.each.teardown(async () => await Database.rollbackGlobalTransaction());

  test('Criar um utilizador', async ({ client }) => {
    const utilizador: UserType = createFakeUser();
    const response = await client.post('/api/user').json(utilizador);
    response.assertStatus(201);
  });

  test('Procurar um utilizador pelo uid e não encontrar', async ({ client }) => {
    const response = await client.get(`/api/user/${v4()}`);
    response.assertStatus(404);
  });

  test('Procurar um utilizador pelo uid retornar os dados', async ({ client }) => {
    const utilizador: UserType = createFakeUser();
    const request = await client.post('/api/user').json(utilizador);
    const uid = request.response.body.uid;
    const response = await client.get(`/api/user/${uid}`);
    response.assertStatus(200);
  });
});
