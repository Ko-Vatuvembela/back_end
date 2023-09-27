import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LoginValidator from 'App/Validators/LoginValidator';
import { UserServices } from 'App/Services/UserServices';
import { mapUserType } from 'App/utils/utils';
import Utilizador from 'App/Models/Utilizador';

const userServices = new UserServices();

export default class AuthController {
  public login = async (ctx: HttpContextContract) => {
    const { request, response, auth } = ctx;
    const payload = await request.validate(LoginValidator);
    const email = payload.email as string;
    const password = payload.password as string;

    const uid = await userServices.getUserPKByEmail(email);
    if (uid) {
      const token = await auth.attempt(String(uid), password);
      const user = mapUserType(ctx.auth.user as Utilizador);

      response.ok({ token, user });
      return;
    }
    response.unauthorized();
  };

  public logout = async (ctx: HttpContextContract) => {
    const { response, auth } = ctx;
    await auth.use('api').revoke();
    response.ok({ message: 'Ubita usuku kyambote' });
  };
}
