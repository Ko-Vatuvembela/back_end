import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class MailVerification extends BaseModel {
  public static get table() {
    return 'mail_verifications';
  }

  @column({ isPrimary: true })
  public email: string;

  @column()
  public verificationCode: string;
}
