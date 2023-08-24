import Route from '@ioc:Adonis/Core/Route';

export const languageRoutes = () =>
  Route.group(() => {
    Route.get('/', 'LanguageController.getLanguages');
    Route.get('/:id', 'LanguageController.getLanguageByID');
    Route.post('/', 'LanguageController.createLanguage');
    Route.put('/:id', 'LanguageController.updateLanguage');
    Route.delete('/:id', 'LanguageController.deleteLanguage');
  }).prefix('/lingua');
// .middleware('auth');
