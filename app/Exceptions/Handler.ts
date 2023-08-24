/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }
  public async handle(error: any, ctx: HttpContextContract) {
    const { response } = ctx;
    if (error.code === 'E_INVALID_AUTH_PASSWORD' || error.code === 'E_UNAUTHORIZED_ACCESS') {
      return response.unauthorized();
    } else if (error.code === 'E_VALIDATION_FAILURE') {
      return response.unprocessableEntity(error.messages.errors);
    } else if (error.code === 'ER_DUP_ENTRY') {
      return response.conflict({ message: 'Este valor já existe' });
    } else {
      console.error(error);
    }
  }
}
