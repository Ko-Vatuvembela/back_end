import { type IBibliografia, type IArtigo, type ILivro, type ITese } from 'App/types/types';
import Bibliografia from 'App/Models/Bibliografia';
import Livro from 'App/Models/Livro';
import Artigo from 'App/Models/Artigo';
import Tese from 'App/Models/Tese';

export class BibliografiaService {
  public create = async (
    { ano, nomeAutor, sobrenomeAutor, titulo }: IBibliografia,
    data: IArtigo | ILivro | ITese
  ) => {
    const { $attributes } = await Bibliografia.create({
      titulo,
      ano,
      nomeAutor,
      sobrenomeAutor,
    });
    const { idBibliografia } = $attributes;
    const bibliografiaFK = idBibliografia;

    if ('numeroPaginas' in data && data['numeroPaginas']) {
      const { numeroPaginas } = data;
      return await Artigo.create({ bibliografiaFK, numeroPaginas });
    } else if ('localPublicacao' in data && data['localPublicacao']) {
      const { edicao, editora, localPublicacao } = data;
      return await Livro.create({
        bibliografiaFK,
        edicao,
        editora,
        localPublicacao,
      });
    } else {
      const { grau, nomeInstituicao } = data;
      return await Tese.create({
        bibliografiaFK,
        grau,
        nomeInstituicao,
      });
    }
  };
}
