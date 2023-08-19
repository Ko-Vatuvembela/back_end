import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserValidator from 'App/Validators/UserValidator';
import UpdateUserValidator from 'App/Validators/UpdateUserValidator';
import { UserServices } from 'App/Services/UserServices';
import { v4 } from 'uuid';
import UUIDValidator from 'App/Validators/UUIDValidator';
import { UserType } from 'App/types/types';
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
    const uid = String((await request.validate(UUIDValidator)).params.uid);
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
    const payload = await request.validate(UpdateUserValidator);
    const { nome, sobrenome, email, password, params } = payload;
    const oldUser: UserType = {
      nome: String(nome),
      sobrenome: String(sobrenome),
      email: String(email),
      password: String(password),
    };
    const { uid } = params;
    const user = await userServices.getUserByPK(uid);
    if (user) {
      const updatedUser = await userServices.updateUser(uid, oldUser);
      response.ok(updatedUser);
    } else {
      response.notFound();
    }
  };
}
