import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { PostServices } from 'App/Services/PostServices';
import { LanguageServices } from 'App/Services/LanguageServices';
import LanguageIDValidator from 'App/Validators/LanguageIDValidator';
import PostIDValidator from 'App/Validators/PostIDValidator';
import PostValidator from 'App/Validators/PostValidator';
import UpdatePostValidator from 'App/Validators/UpdatePostValidator';
import CategoryValidator from 'App/Validators/CategoryValidator';
import { ALL_LANGUAGES } from 'App/utils/utils';

const postServices = new PostServices();
const languageServices = new LanguageServices();

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
  public getPostsByCategory = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(CategoryValidator);
    const { categoria, lingua } = params;

    if (lingua !== ALL_LANGUAGES) {
      if (!(await languageServices.getLanguageByID(lingua as number))) {
        response.unprocessableEntity();
        return;
      }
    }
    response.ok(await postServices.getPostByCategory(categoria, lingua));
  };
  public getCategories = async ({ response }: HttpContextContract) => {
    response.ok(await postServices.getCategories());
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
    const { params, conteudo, categoria, titulo } = await request.validate(UpdatePostValidator);
    const post = await postServices.getByID(params.idPost, params.idLingua);
    if (post.length) {
      if (await postServices.update(params.idPost, params.idLingua, titulo, categoria, conteudo)) {
        response.ok({});
        return;
      }
    }
    response.notFound();
  };
  public create = async ({ request, response, auth }: HttpContextContract) => {
    const { conteudo, linguaFK, titulo, categoria } = await request.validate(PostValidator);
    const uid = auth.user?.uid;
    const data = await postServices.create(uid, linguaFK, titulo, categoria, conteudo);
    response.created(data);
  };
}
