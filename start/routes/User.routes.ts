import Route from '@ioc:Adonis/Core/Route';

export const userRoutes = () =>
  Route.group(() => {
    Route.post('/', 'UsersController.createUser');
    Route.get('/:uid', 'UsersController.findUser');
    Route.delete('/:uid', 'UsersController.deleteUser');
    Route.put('/:uid', 'UsersController.updateUser');
  }).prefix('/user');
