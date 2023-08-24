import Lingua from 'App/Models/Lingua';
export class LanguageServices {
  public createLanguage = async (lingua: string) => {
    const { $attributes } = await Lingua.create({ lingua });
    return $attributes;
  };
  public getLanguages = async () => {
    return await Lingua.all();
  };
  public getLanguageByID = async (idLingua: number) => {
    return await Lingua.findBy('id_lingua', idLingua);
  };
  public updateLanguage = async (idLingua: number, lingua: string) => {
    const linguaAntiga = await Lingua.findBy('id_lingua', idLingua);
    if (linguaAntiga) {
      await Lingua.updateOrCreate({ idLingua }, { lingua });
      return true;
    }
    return false;
  };
  public deleteLanguage = async (idLingua: number) => {
    const lingua = await Lingua.findBy('id_lingua', idLingua);
    if (lingua) {
      await lingua.delete();
      return true;
    }
    return false;
  };
}
