import Route from '@ioc:Adonis/Core/Route';

export const userRoutes = () =>
  Route.group(() => {
    Route.post('/', 'UsersController.createUser');
    Route.get('/:uid', 'UsersController.findUser');
  }).prefix('/user');
