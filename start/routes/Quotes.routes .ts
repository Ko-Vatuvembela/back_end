import Route from '@ioc:Adonis/Core/Route';

export const quotesRoutes = () =>
  Route.group(() => {
    Route.post('/', 'QuotesController.createQuote');
    Route.get('/:idProverbio', 'QuotesController.findQuote');
    Route.put('/:idProverbio', 'QuotesController.updateQuote');
    Route.delete('/:idProverbio', 'QuotesController.deleteQuote');
    Route.get('/', 'QuotesController.allQuotes');
  })
    .prefix('/quotes')
    .middleware(['auth', 'enabledaccount']);
