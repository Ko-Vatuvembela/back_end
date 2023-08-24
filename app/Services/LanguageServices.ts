import Lingua from 'App/Models/Lingua';
export class LanguageServices {
  public createLanguage = async (lingua: string) => {
    const { $attributes } = await Lingua.create({ lingua });
    return $attributes;
  };
  public getLanguages = async () => {
    return await Lingua.all();
  };
  public getLanguageByID = async (id: number) => {
    return await Lingua.findBy('id_lingua', id);
  };
  public updateLanguage = async (id: number, lingua: string) => {
    const linguaAntiga = await Lingua.findBy('id_lingua', id);
    if (linguaAntiga) {
      await Lingua.updateOrCreate({ id }, { lingua });
      return true;
    }
    return false;
  };
  public deleteLanguage = async (id: number) => {
    const lingua = await Lingua.findBy('id_lingua', id);
    if (lingua) {
      await lingua.delete();
      return true;
    }
    return false;
  };
}
