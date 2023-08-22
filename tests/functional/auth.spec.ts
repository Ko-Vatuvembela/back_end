import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';

test.group('Testar a funcionalidades relacionadas ao email', (group) => {
  group.each.setup(async () => await Database.beginGlobalTransaction());
  group.each.teardown(async () => await Database.rollbackGlobalTransaction());

  test('Realizar o login de um usuário desconhecido', async ({ client }) => {
    const email = 'roddas360@gmail.com';
    const password = '123456789';
    const response = await client
      .post('/api/auth/login')
      .json({ email: email, password: password });
    response.assertStatus(401);
  });
});
