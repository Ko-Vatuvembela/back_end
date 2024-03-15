import Palavra from 'App/Models/Palavra';
import { string } from '@ioc:Adonis/Core/Helpers';
import Significado from 'App/Models/Significado';

export class DictionaryServices {
  public create = async (
    palavra: string,
    pronuncia: string,
    significado: string,
    classeGramaticalFK: number,
    exemplo: string,
    linguaFK: number,
    utilizadorFK: number
  ) => {
    const findWord = await Palavra.findBy('palavra', palavra.toLocaleLowerCase().trim());
    if (findWord) {
      await Significado.create({
        significado: significado.toLocaleLowerCase().trim(),
        exemplo: string.capitalCase(exemplo.trim()),
        palavraFK: findWord.idPalavra,
        classeGramaticalFK,
        utilizadorFK,
      });
    } else {
      const newWord = await Palavra.create({
        linguaFK,
        palavra: palavra.toLocaleLowerCase().trim(),
        pronuncia: pronuncia.toLocaleLowerCase(),
      });
      await Significado.create({
        significado: significado.toLocaleLowerCase().trim(),
        exemplo: string.capitalCase(exemplo.trim()),
        palavraFK: newWord.idPalavra,
        classeGramaticalFK,
        utilizadorFK,
      });
    }
    return true;
  };
  public findWord = async (idPalavra: number): Promise<object | boolean> => {
    const significado = await Significado.query()
      .where('palavra_fk', idPalavra)
      .preload('idPalavra')
      .preload('idClasseGramatical');
    return significado;
  };
  public getWordsByLetter = async (linguaFK: number, initial: string) => {
    const palavra = await Palavra.query()
      .where('lingua_fk', linguaFK)
      .whereLike('palavra', initial.toLowerCase() + '%');
    return palavra;
  };

  public searchWord = async (payload: string) => {
    const palavra = await Palavra.query().whereLike('palavra', '%' + payload + '%');
    return palavra;
  };
  public updateWord = async (
    linguaFK: number,
    idPalavra: number,
    palavra: string
  ): Promise<object | boolean> => {
    await Palavra.updateOrCreate({ idPalavra }, { palavra: string.capitalCase(palavra), linguaFK });
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
