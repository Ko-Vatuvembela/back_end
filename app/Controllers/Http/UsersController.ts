import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserValidator from 'App/Validators/UserValidator';
import { UserServices } from 'App/Services/UserServices';
import Utilizador from 'App/Models/Utilizador';
import { v4 } from 'uuid';
import UsernameValidator from 'App/Validators/UsernameValidator';

const userServices = new UserServices();

export default class UsersController {
  public createUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    let payload = await request.validate(UserValidator);
    const newUser = Object.assign(payload, { uid: v4() }) as Utilizador;
    await userServices.createUser(newUser);
    response.created(newUser);
  };
  public getUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    const username = String(await request.validate(UsernameValidator));
    const user = await userServices.getUserByPK(username);
    if (user) {
      response.ok(user);
    } else {
      response.notFound();
    }
  };
}
