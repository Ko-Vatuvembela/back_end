import Database from '@ioc:Adonis/Lucid/Database';
import Artigo from 'App/Models/Artigo';
import Bibliografia from 'App/Models/Bibliografia';
import Livro from 'App/Models/Livro';
import Postagem from 'App/Models/Postagem';
import Tese from 'App/Models/Tese';
import { ALL_LANGUAGES, categorias, tipoBibliografia } from 'App/utils/utils';

export class PostServices {
  public create = async (
    utilizadorFK: number,
    bibliografiaFK: number,
    linguaFK: number,
    titulo: string,
    categoria: string,
    conteudo: string
  ) => {
    const { $attributes } = await Postagem.create({
      utilizadorFK,
      categoria,
      bibliografiaFK,
      linguaFK,
      conteudo,
      titulo,
    });
    return $attributes;
  };
  public getByID = async (idPostagem: number) => {
    const data = await Postagem.query()
      .where({ idPostagem })
      .preload('uid', (data) => data.select('nome', 'sobrenome'))
      .preload('idBibliografia', (data) => data.select('*'));

    const { bibliografiaFK } = data[0].$attributes;
    let tmp = data[0].$preloaded.idBibliografia as Bibliografia;
    const { tipo } = tmp.$attributes;
    if (tipo === tipoBibliografia[0]) {
      // Artigo
      const artigo = await Artigo.findBy('bibliografia_fk', bibliografiaFK);
      return { data, artigo };
    } else if (tipo === tipoBibliografia[1]) {
      //Tese
      const tese = await Tese.findBy('bibliografia_fk', bibliografiaFK);
      return { data, tese };
    }
    //Livro
    const livro = await Livro.findBy('bibliografia_fk', bibliografiaFK);
    return { data, livro };
  };
  public getPostByCategory = async (categoria: string, language = ALL_LANGUAGES) => {
    return await Database.from(Postagem.table)
      .select('id_postagem', 'titulo')
      .where({ categoria, lingua_fk: language });
  };
  public getCategories = () => {
    return categorias;
  };
  public getAllPosts = async (linguaFK: number) => {
    const data = await Postagem.query()
      .where('lingua_fk', linguaFK)
      .preload('uid', (data) => data.select('nome', 'sobrenome'))
      .preload('idLingua', (data) => data.select('lingua'))
      .preload('idBibliografia', (data) => data.select('*'))
      .groupBy('id_postagem');
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

  public getOwner = async (idPostagem: number) => {
    return await Database.from(Postagem.table).select('utilizador_fk').where({ idPostagem });
  };
}
