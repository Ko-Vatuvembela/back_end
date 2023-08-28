import Route from '@ioc:Adonis/Core/Route';

export const quotesRoutes = () =>
  Route.group(() => {
    Route.post('/', 'QuotesController.createQuote');
    // Route.get('/', 'QuotesController.create');
  })
    .prefix('/quotes')
    .middleware('auth');
