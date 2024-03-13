import Palavra from 'App/Models/Palavra';
import Significado from 'App/Models/Significado';

export class DictionaryServices {
  // public create = async (
  //   palavra: string,
  //   significado: string,
  //   classeGramaticalFK: number,
  //   exemplo: string,
  //   linguaFK: number,
  //   utilizadorFK: number
  // ) => {
  //   const novaPalavra = await Palavra.firstOrCreate({ palavra, linguaFK }, { palavra });
  //   const { idPalavra } = novaPalavra.$attributes;
  //   const novoSignificado = await Significado.create({
  //     significado,
  //     classeGramaticalFK,
  //     exemplo,
  //     palavraFK: idPalavra,
  //     utilizadorFK,
  //   });
  //   const { idSignificado } = novoSignificado.$attributes;
  //   return {
  //     idSignificado,
  //     significado,
  //     exemplo,
  //     linguaFK,
  //     idPalavra,
  //   };
  // };

  public create = async (
    palavra: string,
    significado: string,
    classeGramaticalFK: number,
    exemplo: string,
    linguaFK: number,
    utilizadorFK: number
  ) => {
    const findWord = await Palavra.findBy('palavra', palavra);
    if (findWord) {
      await Significado.create({
        significado,
        exemplo,
        palavraFK: findWord.idPalavra,
        classeGramaticalFK,
        utilizadorFK,
      });
    } else {
      const newWord = await Palavra.create({ linguaFK, palavra });
      await Significado.create({
        significado,
        exemplo,
        palavraFK: newWord.idPalavra,
        classeGramaticalFK,
        utilizadorFK,
      });
    }
    return true;
  };
  public findWord = async (linguaFK: number, idPalavra: number): Promise<object | boolean> => {
    const significado = await Significado.query()
      .where('palavra_fk', idPalavra)
      .preload('idPalavra')
      .preload('idClasseGramatical');
    return significado;
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
