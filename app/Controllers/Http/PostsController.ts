import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { PostServices } from 'App/Services/PostServices';
import { LanguageServices } from 'App/Services/LanguageServices';
import LanguageIDValidator from 'App/Validators/LanguageIDValidator';
import PostIDValidator from 'App/Validators/PostIDValidator';
import PostValidator from 'App/Validators/PostValidator';
import UpdatePostValidator from 'App/Validators/UpdatePostValidator';
import CategoryValidator from 'App/Validators/CategoryValidator';
import { ALL_LANGUAGES, categorias, niveis } from 'App/utils/utils';
import { IArtigo, IBibliografia, ILivro, ITese } from 'App/types/types';
import { BibliografiaService } from 'App/Services/BibliografiaService';
import Bibliografia from 'App/Models/Bibliografia';

const postServices = new PostServices();
const languageServices = new LanguageServices();
const bibliografiaService = new BibliografiaService();

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
    response.ok(categorias);
  };
  public getLevels = async ({ response }: HttpContextContract) => {
    response.ok(niveis);
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
    const { conteudo, linguaFK, tituloPostagem, categoria, bibliografia } =
      await request.validate(PostValidator);

    const uid = auth.user?.uid;
    const {
      ano,
      edicao,
      editora,
      grau,
      nomeAutor,
      nomeInstituicao,
      numeroPaginas,
      localPublicacao,
      sobrenomeAutor,
      titulo,
    } = bibliografia;

    const bibliografiaPayload: IBibliografia = {
      ano,
      nomeAutor,
      sobrenomeAutor,
      titulo,
    };
    const { $attributes } = await Bibliografia.create({
      ano,
      nomeAutor,
      sobrenomeAutor,
      titulo,
    });
    const { idBibliografia } = $attributes;
    const bibliografiaFK = idBibliografia;
    const tipo: IArtigo | ILivro | ITese = {
      numeroPaginas,
      edicao,
      editora,
      localPublicacao,
      grau,
      nomeInstituicao,
      bibliografiaFK,
    };

    response.created(await bibliografiaService.create(bibliografiaPayload, tipo));
    // const data = await postServices.create(uid, linguaFK, titulo, categoria, conteudo);
    // response.created(data);
  };
}
