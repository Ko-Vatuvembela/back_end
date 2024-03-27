import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserServices } from 'App/Services/UserServices';
import MailValidator from 'App/Validators/MailValidator';
import Database from '@ioc:Adonis/Lucid/Database';
import { getRandomNumbers, sendMail } from 'App/types/utils/utils';
import MailVerification from 'App/Models/MailVerification';
import ConfirmationCodeValidator from 'App/Validators/ConfirmationCodeValidator';
const userServices = new UserServices();

export default class MailController {
  public sendMail = async (ctx: HttpContextContract) => {
    const { request, response } = ctx;
    const email = String((await request.validate(MailValidator)).email);
    let message = `O código de confirmação foi enviado para ${email}`;
    const user = await userServices.checkIfEmailExists(email);
    if (user) {
      const confirmationCode = getRandomNumbers();
      Promise.all([
        await Database.from(MailVerification.table).delete().where('email', email),
        await sendMail({ to: email, subject: 'Código de confirmação' }, confirmationCode),
        await MailVerification.create({ email, verificationCode: String(confirmationCode) }),
      ]);
      response.ok({ message });
      return;
    }
    response.notFound({ message: `O email ${email} não existe.` });
  };
  public confirmVerificationCode = async (ctx: HttpContextContract) => {
    const { request, response } = ctx;
    const { email, verificationCode } = await request.validate(ConfirmationCodeValidator);

    const uid = await userServices.getUserPKByEmail(String(email));
    if (uid) {
      const code = await MailVerification.findBy('verification_code', verificationCode);
      if (code) {
        if (code.verificationCode === verificationCode) {
          await code.delete();
          await userServices.updateUser(uid, { ativada: true });
          response.ok({ message: 'Código confirmado com sucesso' });
          return;
        }
      }
    }
    response.notFound({ message: 'O código não existe' });
  };
}
