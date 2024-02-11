import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { PostServices } from 'App/Services/PostServices';
import { LanguageServices } from 'App/Services/LanguageServices';
import LanguageIDValidator from 'App/Validators/LanguageIDValidator';
import PostIDValidator from 'App/Validators/PostIDValidator';
import PostValidator from 'App/Validators/PostValidator';
import UpdatePostValidator from 'App/Validators/UpdatePostValidator';
import CategoryValidator from 'App/Validators/CategoryValidator';
import { categorias, niveis } from 'App/utils/utils';
import { BibliografiaService } from 'App/Services/BibliografiaService';
import Bibliografia from 'App/Models/Bibliografia';

const postServices = new PostServices();
const languageServices = new LanguageServices();
const bibliografiaService = new BibliografiaService();

export default class PostsController {
  public getByID = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(PostIDValidator);
    const post = await postServices.getByID(params.idPost);
    if (post) {
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

    if (!(await languageServices.getLanguageByID(lingua as number))) {
      response.unprocessableEntity();
      return;
    }
    response.ok(await postServices.getPostByCategory(categoria, lingua));
  };
  public getCategories = async ({ response }: HttpContextContract) => {
    response.ok(categorias);
  };
  public getLevels = async ({ response }: HttpContextContract) => {
    response.ok(niveis);
  };
  public delete = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(PostIDValidator);
    if (await postServices.delete(params.idPost, params.idLingua as number)) {
      response.ok({});
      return;
    }
    response.notFound();
  };
  public update = async ({ request, response }: HttpContextContract) => {
    const { params, conteudo, categoria, titulo } = await request.validate(UpdatePostValidator);
    const post = await postServices.getByID(params.idPost);
    if (post) {
      if (await postServices.update(params.idPost, params.idLingua, titulo, categoria, conteudo)) {
        response.ok({});
        return;
      }
    }
    response.notFound();
  };
  public create = async ({ request, response, auth }: HttpContextContract) => {
    const { conteudo, linguaFK, tituloPostagem, categoria, bibliografia } =
      await request.validate(PostValidator);

    const uid = auth.user?.uid;
    const { ano, nomeAutor, sobrenomeAutor, titulo, tipo } = bibliografia;
    const { $attributes } = await Bibliografia.create({
      ano,
      nomeAutor,
      sobrenomeAutor,
      titulo,
      tipo,
    });
    const { idBibliografia } = $attributes;
    await Promise.all([
      bibliografiaService.create(idBibliografia, bibliografia),
      postServices.create(uid, idBibliografia, linguaFK, tituloPostagem, categoria, conteudo),
    ]);
    response.created();
  };
}
