import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LoginValidator from 'App/Validators/LoginValidator';
import { UserServices } from 'App/Services/UserServices';
import { debug } from 'App/utils/utils';

const userServices = new UserServices();

export default class AuthController {
  public login = async (ctx: HttpContextContract) => {
    const { request, response } = ctx;
    const payload = await request.validate(LoginValidator);
    const email = payload.email as string;
    const password = payload.password as string;

    response.ok({ email, password });
    // response.unauthorized();
  };
  public logout = async (ctx: HttpContextContract) => {
    // const { response, auth } = ctx;
    // await auth.use('api').logout();
    // response.unauthorized();
  };
}
