import Route from '@ioc:Adonis/Core/Route';

const MIDDLEWARE_LIST = ['auth', 'enabledaccount'];
export const quotesRoutes = () =>
  Route.group(() => {
    Route.post('/', 'QuotesController.createQuote').middleware(MIDDLEWARE_LIST);
    Route.get('/:idProverbio', 'QuotesController.findQuote').middleware(MIDDLEWARE_LIST);
    Route.put('/:idProverbio', 'QuotesController.updateQuote').middleware(MIDDLEWARE_LIST);
    Route.delete('/:idProverbio', 'QuotesController.deleteQuote').middleware(MIDDLEWARE_LIST);
    Route.get('/', 'QuotesController.allQuotes').middleware(MIDDLEWARE_LIST);
    Route.get('/page/:id/:page', 'QuotesController.getQuotesByPage');
  }).prefix('/quotes');
