import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class EnabledAccount {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const user = auth.user?.ativada;
    if (user) await next();
    else response.status(423);
  }
}
