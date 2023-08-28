import Route from '@ioc:Adonis/Core/Route';

export const dictionaryRoutes = () =>
  Route.group(() => {
    Route.post('/', 'DictionaryController.create');
    Route.get('/:idLingua/:idPalavra', 'DictionaryController.findWord');
    Route.put('/:idLingua/:idPalavra', 'DictionaryController.updateWord');
    Route.delete('/:idPalavra', 'DictionaryController.deleteWord');
  })
    .prefix('/dictionary')
    .middleware('auth');
