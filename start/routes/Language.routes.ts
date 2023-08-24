import Route from '@ioc:Adonis/Core/Route';

export const languageRoutes = () =>
  Route.group(() => {
    Route.get('/', 'LanguageController.getLanguages');
    Route.get('/:idLingua', 'LanguageController.getLanguageByID');
    Route.post('/', 'LanguageController.createLanguage');
    Route.put('/:idLingua', 'LanguageController.updateLanguage');
    Route.delete('/:idLingua', 'LanguageController.deleteLanguage');
  }).prefix('/lingua');
// .middleware('auth');
