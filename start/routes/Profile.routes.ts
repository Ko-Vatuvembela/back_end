import Route from '@ioc:Adonis/Core/Route';

export const profileRoutes = () =>
  Route.group(() => {
    Route.get('/', 'UsersController.getProfile');
    Route.get('/logout', 'AuthController.logout');
    Route.delete('/:uid', 'UsersController.deleteUser');
    Route.get('/:uid', 'UsersController.findUser');
    Route.put('/:uid', 'UsersController.updateUser');
  })
    .prefix('/profile')
    .middleware(['auth', 'enabledaccount']);
