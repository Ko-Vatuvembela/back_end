import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Lingua from 'App/Models/Lingua';
import Proverbio from 'App/Models/Proverbio';
import Utilizador from 'App/Models/Utilizador';

export default class extends BaseSeeder {
  public async run() {
    const email = 'dev_developer@outlook.com';
    const user = await Utilizador.findBy('email', email);
    const allLanguages = await Lingua.all();
    const languageID = new Map<string, number>();

    allLanguages.map(({ lingua, id }) => {
      languageID.set(lingua, id);
    });
    const UMBUNDU = languageID.get('Umbundu');
    const KIMBUNDU = languageID.get('Kimbundu');
    const COKWE = languageID.get('Cokwé');
    const NGANGELA = languageID.get('Ngangela');
    const OSHIKWANYAMA = languageID.get('Oshikwanyama');
    const OLUNYANEKA = languageID.get('Olunyaneka');
    const KIKONGO = languageID.get('Kikongo');
    const LINGALA = languageID.get('Lingala');
    const FIOTE = languageID.get('Fiote');
    const IBINDA = languageID.get('Ibinda');

    const quotesList = [
      {
        proverbio: "Ekepa kalilinasi l'ositu, omunu kavokendi lomwenyo.",
        explicacao:
          'O osso está para a carne assim como a pessoa está para a vida. Este provérbio pode ser proferido quando se pretende ensinar ou elucidar alguém sobre a importância da relação existente entre a pessoa, as partes do seu corpo e a própria vida. A relação existencial que se observa nas duas orações do provérbio, permite inferir a construção de uma metonímia, pois o valor da carne e da pessoa humana é aferido por uma das suas partes. É que não há carne sem osso, mas também não há vida humana sem pessoa.',
        data: '',
        linguaFK: UMBUNDU,
        utilizadorFK: user?.uid,
      },
      {
        proverbio: "Ekova k'omanu, ocipa k'inyama.",
        explicacao:
          'Não se deve confundir a pessoa com os animais. Apesar da pessoa e os animais possuírem pele, há na sua aparência uma diferença essencial e profunda; O que permite distinguí-los. Por isso, tendo em atenção à dignidade humana, não se pode maltratar as pessoas como se fossem animais. Se quiser ser tratado como pessoa, deve cuidar mais da higiene, para não se assemelhar a um animal. A metonímia observa-se aqui igualmente. A aparente semelhança das partes não pode ser critério para avaliar o todo de duas realidades distintas.',
        data: '',
        linguaFK: languageID.get('Umbundu'),
        utilizadorFK: user?.uid,
      },
      {
        proverbio: "Ekova liyetimba, olondunge k'utima.",
        explicacao:
          'Do mesmo modo que o corpo revela o aspecto físico exterior, assim o grau de responsabilidade e integridade moral determina o carácter da pessoa. O aspecto físico exterior não traduz o valor e responsabilidade morais de uma pessoa. Os homens não se medem pela estatura física. Antes pelo contrário, valem pela sua dimensão espiritual e interior.',
        data: '',
        linguaFK: UMBUNDU,
        utilizadorFK: user?.uid,
      },
      {
        proverbio: "Onjimbo l'elungi, omunu l'onjo",
        explicacao:
          'O papa-formigas vive na cova, a pessoa habita uma casa. Um animal como o papa-formigas vive em qualquer cova que encontrar já a pessoa tem sempre uma casa. Enquanto as covas abundam na selva, os homens constroem as casas de acordo com as suas necessidades. Os animais não transformam a natureza como os homens. A dignidade da pessoa não se confunde com o modo de vida dos animais.',
        data: '',
        linguaFK: UMBUNDU,
        utilizadorFK: user?.uid,
      },
      {
        proverbio: "K'ono kwatota, omanu valuka.",
        explicacao:
          'Secou a nascente do rio, as pessoas mudam de lugar. Há uma relação de causa e efeito entre a existência de um rio e a constituição de aglomerados populacionais nas suas proximidades. A água é indispensável para a sedentarização dos homens e quando a fonte seca parte-se à procura de outro lugar.',
        data: '',
        linguaFK: UMBUNDU,
        utilizadorFK: user?.uid,
      },
      {
        proverbio: 'Longa ocinyama, kukase omunu.',
        explicacao:
          'Alveja-se o animal, não se apedreja a pessoa. O animal pode ser alvo de caça, mas a vida humana é sagrada e deve merecer respeito. A pessoa nem sequer deve ser apedrejada.',
        data: '',
        linguaFK: UMBUNDU,
        utilizadorFK: user?.uid,
      },
      {
        proverbio: 'Omunu nda figo wafa kami ondalu, ava vasyala vayota.',
        explicacao:
          'A pessoa que morre não extingue o fogo, os vivos continuam a servir-se dele - o fogo. Apesar da morte, que é uma contingência que afeta os homens, a vida prossegue com os vivos. A substituição e a sucessão, são incontornáveis no mundo das relações sociais. A morte não põe termo à sobrevivência comunitária. Não há pessoas insubstituíveis.',
        data: '',
        linguaFK: UMBUNDU,
        utilizadorFK: user?.uid,
      },
      {
        proverbio:
          "A engi adilanga mu longa se adila va makaya, ay'adilanga va makaya se adila mu longa",
        explicacao:
          'Muitos dos que comem nos pratos comerão cedo ou tarde sobre as folhas e os que comem sobre as folhas comerão nos pratos. Este provérbio ensina-nos que tudo, neste mundo, está sujeito a inúmeras vicissitudes, e que ninguém sabe hoje de que será feito amanhã.',
        data: '',
        linguaFK: KIKONGO,
        utilizadorFK: user?.uid,
      },
      {
        proverbio:
          'A engi avwandanga va kyandu, se avwanda va ntoto, avwandanga va ntoto se avwanda va kyandu(kyandi)',
        explicacao:
          'Muitos dos que se assentam nas cadeiras, assentar-se-ão no chão, e os que estão sentados no chão assentar-se-ão nas cadeiras. Este provérbio, significa que neste mundo tudo pode mudar.',
        data: '',
        linguaFK: KIKONGO,
        utilizadorFK: user?.uid,
      },
      {
        proverbio: "Afwidi mu vita ka ena lutangu ko, mun'atukidi ena ye lutangu lwau.",
        explicacao:
          'Os que morreram na guerra são inumeráveis. Contudo, são conhecidos pelas suas famílias, pelos seus nomes e números. Assim, durante a guerra, as famílias conhecem e choram os seus ente queridos mortos pela pátria, enquanto o estado os regista pelos seus nomes e soma o seu número.',
        data: '',
        linguaFK: KIKONGO,
        utilizadorFK: user?.uid,
      },
      {
        proverbio: 'Akento anati a nkalu za maza ye mafunda ma mambu.',
        explicacao:
          'As mulheres são portadoras das calabaças de água e dos embrulhos de bisbilhotices, isto é, as mulheres são mais boateiras do que os homens.',
        data: '',
        linguaFK: KIKONGO,
        utilizadorFK: user?.uid,
      },
      {
        proverbio: "<<Akento kumi ngi'au!>> - Ngeye mosi ukivunanga.",
        explicacao:
          "<</Tenho dez mulheres>>: Tens dez? Tu te enganas a ti mesmo. Estas tantas mulheres não são realmente todas tuas, pois 'quem muito abarca, pouco aperta'.",
        data: '',
        linguaFK: KIKONGO,
        utilizadorFK: user?.uid,
      },
      {
        proverbio:
          'Akento nsambwadi anete nsengo nsambwadi ku nkoko atombokele ye ngandu nsambwadi, avo akala nsambwadi anete tanzi nsambwadi, wana simbi nsambwadi atomboka yau.',
        explicacao:
          "Sete mulheres foram ao rio com sete enxadas e trouxeram sete crocodilos. Se sete homens forem ao mesmo rio com sete machados, trarão certamente sete sereias. Este provérbio significa que 'as grandes causas produzem grandes efeitos.",
        data: '',
        linguaFK: KIKONGO,
        utilizadorFK: user?.uid,
      },
    ];

    await Proverbio.updateOrCreateMany('proverbio', quotesList);
  }
}
