import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { PostServices } from 'App/Services/PostServices';
import LanguageIDValidator from 'App/Validators/LanguageIDValidator';
import PostIDValidator from 'App/Validators/PostIDValidator';
import PostValidator from 'App/Validators/PostValidator';
import UpdatePostValidator from 'App/Validators/UpdatePostValidator';

const postServices = new PostServices();

export default class PostsController {
  public getByID = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(PostIDValidator);
    const post = await postServices.getByID(params.idPost, params.idLingua);
    if (post.length) {
      response.ok(post);
      return;
    }
    response.notFound();
  };
  public getAllPosts = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(LanguageIDValidator);
    response.ok(await postServices.getAllPosts(params.id));
  };
  public delete = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(PostIDValidator);
    if (await postServices.delete(params.idPost, params.idLingua)) {
      response.ok({});
      return;
    }
    response.notFound();
  };
  public update = async ({ request, response }: HttpContextContract) => {
    const { params, conteudo } = await request.validate(UpdatePostValidator);
    const post = await postServices.getByID(params.idPost, params.idLingua);
    if (post.length) {
      if (await postServices.update(params.idPost, params.idLingua, conteudo)) {
        response.ok({});
        return;
      }
    }
    response.notFound();
  };
  public create = async ({ request, response, auth }: HttpContextContract) => {
    const { conteudo, linguaFK } = await request.validate(PostValidator);
    const uid = auth.user?.uid;
    const data = await postServices.create(uid, linguaFK, conteudo);
    response.created(data);
  };
}
