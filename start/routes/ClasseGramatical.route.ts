import Route from '@ioc:Adonis/Core/Route';

export const classeGramaticalRoutes = () =>
  Route.group(() => {
    Route.post('/', 'ClasseGramaticalsController.insert');
    Route.get('/', 'ClasseGramaticalsController.getAll');
    Route.get('/:id', 'ClasseGramaticalsController.getById');
    Route.put('/:id', 'ClasseGramaticalsController.update');
    Route.delete('/:id', 'ClasseGramaticalsController.delete');
  })
    .prefix('/classe_gramatical')
    .middleware(['auth', 'enabledaccount']);
