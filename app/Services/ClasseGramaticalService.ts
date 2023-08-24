import ClasseGramatical from 'App/Models/ClasseGramatical';

export class ClasseGramaticalService {
  public insert = async (classeGramatical: string) => {
    const { $attributes } = await ClasseGramatical.create({ classeGramatical });
    return $attributes;
  };
  public getAll = async () => {
    return await ClasseGramatical.all();
  };
  public findById = async (id: number) => {
    const classeGramatical = await ClasseGramatical.findBy('id_classe_gramatical', id);
    return classeGramatical;
  };
  public update = async (id: number, classeGramatical: string) => {
    const payload = await this.findById(id);
    if (payload) {
      await ClasseGramatical.updateOrCreate({ idClasseGramatical: id }, { classeGramatical });
      return true;
    }
    return false;
  };
  public delete = async (id: number) => {
    const payload = await this.findById(id);
    if (payload) {
      payload.delete();
      return true;
    }
    return false;
  };
}
