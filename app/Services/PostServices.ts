import Postagem from 'App/Models/Postagem';
import { ALL_LANGUAGES, categorias } from 'App/utils/utils';

export class PostServices {
  public create = async (
    utilizadorFK: number,
    linguaFK: number,
    titulo: string,
    categoria: string,
    conteudo: string
  ) => {
    const { $attributes } = await Postagem.create({
      utilizadorFK,
      categoria,
      linguaFK,
      conteudo,
      titulo,
    });
    return $attributes;
  };
  public getByID = async (idPostagem: number, linguaFK: number) => {
    const data = await Postagem.query()
      .preload('idLingua')
      .where({ idPostagem, linguaFK })
      .preload('uid', (data) => data.select('nome', 'sobrenome'));
    return data;
  };
  public getPostByCategory = async (categoria: string, language = ALL_LANGUAGES) => {
    return language === ALL_LANGUAGES
      ? await Postagem.query().where({ categoria })
      : await Postagem.query().where({ categoria, linguaFK: language });
  };
  public getCategories = () => {
    return categorias;
  };
  public getAllPosts = async (linguaFK: number) => {
    const data = await Postagem.query()
      .where('lingua_fk', linguaFK)
      .preload('uid', (data) => data.select('nome', 'sobrenome'));
    return data;
  };
  public update = async (
    idPostagem: number,
    linguaFK: number,
    titulo: string,
    categoria: string,
    conteudo: string
  ) => {
    const data = await Postagem.query().preload('idLingua').where({ idPostagem, linguaFK });
    if (data.length) {
      await Postagem.updateOrCreate({ idPostagem, linguaFK }, { conteudo, categoria, titulo });
      return true;
    }
    return false;
  };
  public delete = async (idPostagem: number, linguaFK: number) => {
    const data = await Postagem.query().preload('idLingua').where({ idPostagem, linguaFK });
    if (data.length) {
      await data[0].delete();
      return true;
    }
    return false;
  };
}
