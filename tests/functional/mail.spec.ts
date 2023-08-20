import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { createFakeUser, debug } from 'App/utils/utils';
import { UserType } from 'App/types/types';

test.group('Testar a funcionalidades relacionadas ao email', (group) => {
  group.each.setup(async () => await Database.beginGlobalTransaction());
  group.each.teardown(async () => await Database.rollbackGlobalTransaction());

  test('Enviar o código de confirmação por um email inexistente - retorna 404', async ({
    client,
  }) => {
    const email = 'dev_developer360@gmail.com';
    const response = await client.post(`/api/mail/send_code`).json({ email: email });
    response.assertStatus(404);
  });

  test('Enviar o código de confirmação por um email existente', async ({ client }) => {
    let utilizador: UserType = createFakeUser();
    utilizador.email = 'roddas360@gmail.com';
    await client.post('/api/user').json(utilizador);
    const { email } = utilizador;
    const response = await client.post(`/api/mail/send_code`).json({ email: email });
    response.assertStatus(200);
  });

  test('Confirmar o código de um email existente', async ({ client }) => {
    let utilizador: UserType = createFakeUser();
    utilizador.email = 'roddas360@gmail.com';
    await client.post('/api/user').json(utilizador);
    const { email } = utilizador;
    const verificationCode = '151145';
    const response = await client
      .post(`/api/mail/confirm_code`)
      .json({ email: email, verificationCode: verificationCode });
    response.assertStatus(404);
  });
});
