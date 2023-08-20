import Route from '@ioc:Adonis/Core/Route';
export const mailRoutes = () =>
  Route.group(() => {
    Route.post('/send_code', 'MailController.sendMail');
    Route.post('/confirm_code', 'MailController.confirmVerificationCode');
  }).prefix('/mail');
