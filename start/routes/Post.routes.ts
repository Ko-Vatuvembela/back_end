import Route from '@ioc:Adonis/Core/Route';

export const postRoutes = () =>
  Route.group(() => {
    Route.get('/categorias', 'PostsController.getCategories');
    Route.get('/categorias/:categoria/:lingua', 'PostsController.getPostsByCategory');
    Route.post('/', 'PostsController.create');
    Route.get('/:idPost', 'PostsController.getByID');
    Route.put('/:idLingua/:idPost', 'PostsController.update');
    Route.delete('/:idLingua/:idPost', 'PostsController.delete');
    Route.get('/:id', 'PostsController.getAllPosts');
  })
    .prefix('/post')
    .middleware(['auth', 'enabledaccount']);
