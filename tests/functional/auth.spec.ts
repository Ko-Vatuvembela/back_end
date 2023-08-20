import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { createFakeUser, debug } from 'App/utils/utils';
import { UserType } from 'App/types/types';

test.group('Testar a funcionalidades relacionadas ao email', (group) => {
  // group.each.setup(async () => await Database.beginGlobalTransaction());
  // group.each.teardown(async () => await Database.rollbackGlobalTransaction());
  // test('Realizar o login', async ({ client }) => {
  //   const email = 'roddas360@gmail.com';
  //   const password = '123456789';
  //   const response = await client.post('/api/auth').json({ email: email, password: password });
  //   response.assertStatus(401);
  // });
});
