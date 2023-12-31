import Palavra from 'App/Models/Palavra';
import Significado from 'App/Models/Significado';

export class DictionaryServices {
  public create = async (
    palavra: string,
    significado: string,
    classeGramaticalFK: number,
    exemplo: string,
    linguaFK: number,
    utilizadorFK: number
  ) => {
    const novaPalavra = await Palavra.firstOrCreate({ palavra, linguaFK }, { palavra });
    const { idPalavra } = novaPalavra.$attributes;
    const novoSignificado = await Significado.create({
      significado,
      classeGramaticalFK,
      exemplo,
      palavraFK: idPalavra,
      utilizadorFK,
    });
    const { idSignificado } = novoSignificado.$attributes;
    return {
      idSignificado,
      significado,
      exemplo,
      linguaFK,
      idPalavra,
    };
  };
  public findWord = async (linguaFK: number, idPalavra: number): Promise<object | boolean> => {
    const palavra = await Palavra.query()
      .where('id_palavra', idPalavra)
      .andWhere('lingua_fk', linguaFK);
    if (palavra.length) {
      const significado = await Significado.query()
        .preload('uid', (data) => data.select('nome', 'sobrenome'))
        .where('palavra_fk', idPalavra);
      if (significado.length) {
        return { palavra, significados: significado };
      }
    }
    return false;
  };
  public getWordsByLetter = async (linguaFK: number, initial: string) => {
    const palavra = await Palavra.query()
      .where('lingua_fk', linguaFK)
      .whereLike('palavra', initial + '%');
    return palavra;
  };
  public updateWord = async (
    linguaFK: number,
    idPalavra: number,
    palavra: string
  ): Promise<object | boolean> => {
    await Palavra.updateOrCreate({ idPalavra }, { palavra, linguaFK });
    return true;
  };
  public updateMeaning = async (significados: Array<Significado>): Promise<object | boolean> => {
    await Significado.updateOrCreateMany('idSignificado', significados);
    return true;
  };
  public deleteWord = async (idPalavra: number): Promise<object | boolean> => {
    const palavra = await Palavra.find(idPalavra);
    if (palavra) {
      palavra.delete();
      return true;
    }
    return false;
  };
}
