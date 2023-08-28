import Proverbio from 'App/Models/Proverbio';
import { QuoteMap } from 'App/types/types';

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
  public findQuote = async (idProverbio: number) => {
    return await Proverbio.find(idProverbio);
  };
  public deleteQuote = async (idProverbio: number) => {
    const quote = await this.findQuote(idProverbio);
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
