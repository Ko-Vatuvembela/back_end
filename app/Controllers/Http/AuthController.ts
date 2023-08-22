import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LoginValidator from 'App/Validators/LoginValidator';
import { UserServices } from 'App/Services/UserServices';

const userServices = new UserServices();

export default class AuthController {
  public login = async (ctx: HttpContextContract) => {
    const { request, response, auth } = ctx;
    const payload = await request.validate(LoginValidator);
    const email = payload.email as string;
    const password = payload.password as string;

    const uid = await userServices.getUserPKByEmail(email);
    const token = await auth.attempt(uid, password);
    response.ok(token);
  };

  public logout = async (ctx: HttpContextContract) => {
    const { response, auth } = ctx;
    await auth.use('api').revoke();
    response.ok({ message: 'Ubita usuku kyambote' });
  };
}
