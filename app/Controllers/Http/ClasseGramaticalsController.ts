import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ClasseGramaticalsController {
  public insert = async ({ request, response }: HttpContextContract) => {
    const payload = await request.validate();
    response.created();
  };
}
