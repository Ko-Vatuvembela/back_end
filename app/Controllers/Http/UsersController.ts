import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserValidator from 'App/Validators/UserValidator';
import { UserServices } from 'App/Services/UserServices';
import Utilizador from 'App/Models/Utilizador';
import { v4 } from 'uuid';
import UUIDValidator from 'App/Validators/UUIDValidator';
const userServices = new UserServices();

export default class UsersController {
  public createUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    let payload = await request.validate(UserValidator);
    const newUser = Object.assign(payload, { uid: v4() }) as Utilizador;
    await userServices.createUser(newUser);
    response.created(newUser);
  };
  public findUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    const uid = String((await request.validate(UUIDValidator)).uuid);
    const user = await userServices.getUserByPK(uid);
    if (user) {
      response.ok(user);
    } else {
      response.notFound();
    }
  };
}
