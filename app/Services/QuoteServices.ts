import Lingua from 'App/Models/Lingua';
import Proverbio from 'App/Models/Proverbio';
import { QuoteMap } from 'App/types/types';
import { decode } from 'he';

export class QuoteServices {
  public createQuote = async ({
    data,
    explicacao,
    proverbio,
    utilizadorFK,
    linguaFK,
  }: QuoteMap) => {
    const { $attributes } = await Proverbio.create({
      data,
      explicacao,
      proverbio,
      utilizadorFK,
      linguaFK,
    });
    return $attributes;
  };
  public allQuotes = async () => {
    return await Proverbio.query().select('proverbio ', 'id_proverbio', 'lingua_fk');
  };
  public random = async () => {
    const data = (
      await Proverbio.query().select('proverbio', 'lingua_fk').orderByRaw('RANDOM()')
    )[0];
    const language = await Lingua.query().select('lingua').where('id_lingua', data.linguaFK);
    return { proverbio: decode(data.proverbio), lingua: language[0].lingua };
  };
  public findQuoteByID = async (idProverbio: number) => {
    const proverbio = await Proverbio.query()
      .where('id_proverbio', idProverbio)
      .preload('uid', (data) => data.select('nome', 'sobrenome'));
    if (proverbio[0]) {
      return proverbio[0];
    }
    return false;
  };
  public findQuote = async (idProverbio: number) => {
    const proverbio = await Proverbio.query()
      .where('id_proverbio', idProverbio)
      .preload('uid', (data) => data.select('nome', 'sobrenome'));
    const language = await Lingua.query().select('lingua').where('id', proverbio[0].linguaFK);
    if (proverbio[0]) {
      return { proverbio: proverbio[0], lingua: language[0].lingua };
    }
    return false;
  };
  public deleteQuote = async (idProverbio: number) => {
    const quote = await this.findQuoteByID(idProverbio);
    if (quote) {
      quote.delete();
      return true;
    }
    return false;
  };
  public updateQuote = async ({
    data,
    explicacao,
    proverbio,
    utilizadorFK,
    linguaFK,
    idProverbio,
  }: QuoteMap) => {
    const quote = await this.findQuote(idProverbio as number);
    if (quote) {
      await Proverbio.updateOrCreate(
        { idProverbio },
        { data, explicacao, proverbio, utilizadorFK, linguaFK }
      );
      return true;
    }
    return false;
  };
}
