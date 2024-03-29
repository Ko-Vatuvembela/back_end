/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';
import { publicRoutes } from './routes/Public.routes';
import { mailRoutes } from './routes/Mail.routes';
import { postRoutes } from './routes/Post.routes';
import { quotesRoutes } from './routes/Quotes.routes ';
import { profileRoutes } from './routes/Profile.routes';
import { authRoutes } from './routes/Auth.routes ';
import { dictionaryRoutes } from './routes/Dictionary.routes';
import { classeGramaticalRoutes } from './routes/ClasseGramatical.route';
import { languageRoutes } from './routes/Language.routes';
Route.group(() => {
  mailRoutes();
  quotesRoutes();
  classeGramaticalRoutes();
  authRoutes();
  dictionaryRoutes();
  publicRoutes();
  postRoutes();
  profileRoutes();
  languageRoutes();
}).prefix('/api');
