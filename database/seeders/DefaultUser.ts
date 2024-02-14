import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Utilizador from 'App/Models/Utilizador';

const email = 'dev_developer@outlook.com';

export default class extends BaseSeeder {
  public async run() {
    await Utilizador.updateOrCreate(
      { email },
      {
        nome: 'Jeff',
        ativada: true,
        sobrenome: 'Neves',
        password:
          '$scrypt$n=16384,r=8,p=1$OtWhadtx0d9bzEr+bzAcpw$E64YcHjj6i8Qu7VtgFjiks7xOiKP5mczU6LT52NGu/l0Ad3xkL/+QV8QTxqC/Z8yDjggVkSou5AxX1t1c87+Rg',
        foto: 'default.svg',
        email,
      }
    );
  }
}
