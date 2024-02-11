import Livro from 'App/Models/Livro';
import Artigo from 'App/Models/Artigo';
import Tese from 'App/Models/Tese';
import { tipoBibliografia } from 'App/utils/utils';

export class BibliografiaService {
  public create = async (
    bibliografiaFK: number,
    data: {
      edicao: number | undefined;
      editora: string | undefined;
      tipo: string | undefined;
      grau: string | undefined;
      nomeInstituicao: string | undefined;
      localPublicacao: string | undefined;
      numeroPaginas: number | undefined;
    }
  ) => {
    const { edicao, editora, grau, localPublicacao, nomeInstituicao, numeroPaginas, tipo } = data;

    if (tipo === tipoBibliografia[0]) {
      // artigo
      return await Artigo.create({ bibliografiaFK, numeroPaginas });
    } else if (tipo === tipoBibliografia[2]) {
      return await Livro.create({
        bibliografiaFK,
        edicao,
        editora,
        localPublicacao,
      });
    } else {
      return await Tese.create({
        bibliografiaFK,
        grau,
        nomeInstituicao,
      });
    }
  };
}
