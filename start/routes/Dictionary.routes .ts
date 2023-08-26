import Route from '@ioc:Adonis/Core/Route';

export const dictionaryRoutes = () =>
  Route.group(() => {
    Route.post('/', 'DictionaryController.create');
    Route.get('/:idLingua/:idPalavra', 'DictionaryController.findWord');
  })
    .prefix('/dictionary')
    .middleware('auth');
