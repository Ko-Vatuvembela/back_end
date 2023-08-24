import Route from '@ioc:Adonis/Core/Route';

export const classeGramaticalRoutes = () =>
  Route.group(() => {
    Route.post('/', 'ClasseGramaticalsController.insert');
  }).prefix('/classe_gramatical');
// .middleware('auth');
