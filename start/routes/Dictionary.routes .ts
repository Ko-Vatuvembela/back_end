import Route from '@ioc:Adonis/Core/Route';

export const dictionaryRoutes = () =>
  Route.group(() => {
    Route.post('/', 'DictionaryController.create');
    Route.get('/:idPalavra', 'DictionaryController.findWord');
    Route.get('/all/:idLingua/:initial', 'DictionaryController.getWordsByLetter');
    Route.put('/:idLingua/:idPalavra', 'DictionaryController.updateWord');
    Route.delete('/:idPalavra', 'DictionaryController.deleteWord');
  })
    .prefix('/dictionary')
    .middleware(['auth', 'enabledaccount']);
