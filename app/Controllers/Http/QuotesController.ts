import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { QuoteServices } from 'App/Services/QuoteServices';
import PageValidator from 'App/Validators/PageValidator';
import QuoteIDValidator from 'App/Validators/QuoteIDValidator';
import QuotesValidator from 'App/Validators/QuotesValidator';
import UpdateQuotesValidator from 'App/Validators/UpdateQuotesValidator';
import { QuoteMap } from 'App/types/types';

const quotesServices = new QuoteServices();

export default class QuotesController {
  public createQuote = async ({ request, response, auth }: HttpContextContract) => {
    const utilizadorFK = auth.user?.uid;
    const { explicacao, linguaFK, proverbio } = await request.validate(QuotesValidator);
    const newQuote: QuoteMap = {
      explicacao: explicacao.trim(),
      linguaFK,
      proverbio: proverbio.trim(),
      utilizadorFK,
    };
    response.created(await quotesServices.createQuote(newQuote));
  };

  public findQuote = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(QuoteIDValidator);
    const quote = await quotesServices.findQuote(params.idProverbio);
    if (quote) {
      return response.ok(quote);
    }
    response.notFound();
  };
  public deleteQuote = async ({ request, response }: HttpContextContract) => {
    const { params } = await request.validate(QuoteIDValidator);
    const quote = await quotesServices.findQuote(params.idProverbio);
    if (quote) {
      await quotesServices.deleteQuote(params.idProverbio);
      return response.ok({});
    }
    response.notFound();
  };
  public updateQuote = async ({ request, response, auth }: HttpContextContract) => {
    const { params, explicacao, linguaFK, proverbio } =
      await request.validate(UpdateQuotesValidator);
    const utilizadorFK = auth.user?.uid;
    const { idProverbio } = params;
    const updatedQuote: QuoteMap = {
      explicacao: explicacao as string,
      linguaFK,
      idProverbio,
      proverbio: proverbio as string,
      utilizadorFK,
    };
    const quote = await quotesServices.updateQuote(updatedQuote);
    if (quote) {
      return response.ok({});
    }
    response.notFound();
  };
  public allQuotes = async ({ response }: HttpContextContract) => {
    response.ok(await quotesServices.allQuotes());
  };
  public getQuotesByPage = async ({ response, request }: HttpContextContract) => {
    const { params } = await request.validate(PageValidator);
    response.ok(await quotesServices.getQuotesByPage(params.page));
  };
  public random = async ({ response }: HttpContextContract) => {
    response.ok(await quotesServices.random());
  };
}
