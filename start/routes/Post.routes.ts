import Route from '@ioc:Adonis/Core/Route';

export const postRoutes = () =>
  Route.group(() => {
    Route.post('/', 'PostsController.create');
    Route.get('/:idLingua/:idPost', 'PostsController.getByID');
    Route.put('/:idLingua/:idPost', 'PostsController.update');
    Route.delete('/:idLingua/:idPost', 'PostsController.delete');
    Route.get('/:id', 'PostsController.getAllPosts');
  })
    .prefix('/post')
    .middleware('auth');
