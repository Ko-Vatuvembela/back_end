import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
  public createUser = async (ctx: HttpContextContract) => {
    const { response } = ctx;

    response.ok({ user: 'created' });
  };
}
