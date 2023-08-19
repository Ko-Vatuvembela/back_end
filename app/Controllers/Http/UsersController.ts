import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserValidator from 'App/Validators/UserValidator';
import UpdateUserValidator from 'App/Validators/UpdateUserValidator';
import { UserServices } from 'App/Services/UserServices';
import { v4 } from 'uuid';
import UUIDValidator from 'App/Validators/UUIDValidator';
import { UpdateUserType, UserType } from 'App/types/types';
import { debug } from 'App/utils/utils';
const userServices = new UserServices();

export default class UsersController {
  public createUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    let payload = await request.validate(UserValidator);

    const newUser: UserType = {
      uid: v4(),
      nome: payload.nome,
      sobrenome: payload.sobrenome,
      password: payload.password,
      foto: payload.foto,
      email: payload.email,
    };
    await userServices.createUser(newUser);
    response.created(newUser);
  };
  public findUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    const uid = String((await request.validate(UUIDValidator)).params.uid);
    const user = await userServices.getUserByPK(uid);
    if (user) {
      response.ok(user);
    } else {
      response.notFound();
    }
  };
  public deleteUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    const uid = String((await request.validate(UUIDValidator)).uuid);
    const user = await userServices.getUserByPK(uid);
    if (user) {
      userServices.deleteUser(uid);
      response.ok({});
    } else {
      response.notFound();
    }
  };
  public updateUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    const uid = String((await request.validate(UUIDValidator)).uuid);
    const user = await userServices.getUserByPK(uid);
    if (user) {
      const payload = (await request.validate(UpdateUserValidator)) as UpdateUserType;
      userServices.updateUser(uid, payload);
      response.ok({});
    } else {
      response.notFound();
    }
  };
}
