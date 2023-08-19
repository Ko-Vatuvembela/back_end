import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { createFakeUser, debug } from 'App/utils/utils';
import { v4 } from 'uuid';
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

  test('Atualizar os dados de um utilizador que não existe e retorna 404', async ({ client }) => {
    const utilizador: UserType = createFakeUser();
    const response = await client.put(`/api/user/${v4()}`).json(utilizador);
    response.assertStatus(404);
  });

  test('Atualizar os dados de um utilizador existente', async ({ client }) => {
    let utilizador: UserType = createFakeUser();
    const request = await client.post('/api/user').json(utilizador);
    const uid = request.response.body.uid;
    utilizador.email = faker.internet.email();
    utilizador.nome = faker.person.fullName();
    const response = await client.put(`/api/user/${uid}`).json(utilizador);
    response.assertStatus(200);
  });
});
