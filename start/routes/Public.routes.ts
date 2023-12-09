import Route from '@ioc:Adonis/Core/Route';

export const publicRoutes = () =>
  Route.group(() => {
    Route.post('/user', 'UsersController.createUser');
    Route.get('/test', 'UsersController.test');
  }).prefix('/public');
