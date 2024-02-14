import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserValidator from 'App/Validators/UserValidator';
import UpdateUserValidator from 'App/Validators/UpdateUserValidator';
import { UserServices } from 'App/Services/UserServices';
import UUIDValidator from 'App/Validators/UUIDValidator';
import { UserType } from 'App/types/types';
import Utilizador from 'App/Models/Utilizador';
import { getRandomNumbers, mapUserType, sendMail, setRandomPassword } from 'App/utils/utils';
import Database from '@ioc:Adonis/Lucid/Database';
import MailVerification from 'App/Models/MailVerification';
import ForgotPasswordValidator from 'App/Validators/ForgotPasswordValidator';
const userServices = new UserServices();
export default class UsersController {
  public createUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    let payload = await request.validate(UserValidator);
    const email = payload.email as string;

    const newUser: UserType = {
      nome: payload.nome,
      sobrenome: payload.sobrenome,
      password: payload.password,
      foto: payload.foto,
      email,
    };

    if (await userServices.checkIfEmailExists(email)) {
      response.conflict({ message: `O email ${email} já existe` });
      return;
    }
    const confirmationCode = getRandomNumbers();
    const datas = await Promise.all([
      await Database.from(MailVerification.table).delete().where('email', email),
      await sendMail({ to: email, subject: 'Código de confirmação' }, confirmationCode),
      await MailVerification.create({ email, verificationCode: String(confirmationCode) }),
      await userServices.createUser(newUser),
    ]);

    const { nome, sobrenome, foto, uid } = datas[3];
    console.log(datas[3]);
    response.created({ nome, sobrenome, foto, uid, email, ativada: false });
  };
  public findUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    const uid = Number((await request.validate(UUIDValidator)).params.uid);
    const user = await userServices.getUserByPK(uid);
    if (user) {
      response.ok(user);
    } else {
      response.notFound();
    }
  };
  public test = (ctx: HttpContextContract) => {
    const { response } = ctx;
    response.ok({ message: 'Tudo Okay' });
  };
  public getProfile = async ({ response, auth }: HttpContextContract) => {
    const user = mapUserType(auth.user as Utilizador);
    response.ok(user);
  };
  public deleteUser = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    const uid = Number((await request.validate(UUIDValidator)).params.uid);
    const user = await userServices.getUserByPK(uid);
    if (user) {
      userServices.deleteUser(uid);
      response.ok({});
    } else {
      response.notFound();
    }
  };
  public updateUserImage = async (ctx: HttpContextContract) => {
    const { response, request, auth } = ctx;

    if (auth.user) {
      const { uid } = auth.user;
      const foto = request.file('foto', {
        extnames: ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'],
        size: '2mb',
      });
      if (foto) {
        await foto.moveToDisk('./');
        const fileName = foto.fileName as string;
        const utilizador = await Utilizador.find(uid);
        if (utilizador) {
          await utilizador.merge({ foto: fileName }).save();
          return response.ok({ foto: fileName });
        }
      }
    }
    response.unauthorized();
  };
  public updateUser = async (ctx: HttpContextContract) => {
    const { response, request, auth } = ctx;
    const payload = await request.validate(UpdateUserValidator);
    const user = auth.user;

    if (user) {
      const utilizador = await Utilizador.find(user.uid);
      if (utilizador) {
        if (payload.email) {
          const findMail = await Utilizador.findBy('email', payload.email);
          if (findMail && findMail?.uid !== user.uid) {
            return response.conflict();
          }
        }
        await utilizador.merge(payload).save();
        return response.ok(payload);
      }
      response.notFound();
    }
    response.unauthorized();
  };
  public resetPassword = async (ctx: HttpContextContract) => {
    const { response, request } = ctx;
    const payload = await request.validate(ForgotPasswordValidator);
    const { email } = payload;
    const uid = await userServices.getUserPKByEmail(email as string);
    if (uid !== undefined) {
      const password = setRandomPassword(email as string);
      await Promise.all([
        userServices.updateUser(uid, { password }),
        sendMail({ to: email as string, subject: 'Nova senha' }, password),
      ]);
      return response.ok({
        message: `Foi enviado a nova senha para o email ${
          email as string
        }. Realize o login  com a nova senha.`,
      });
    }
    response.notFound();
  };
}
