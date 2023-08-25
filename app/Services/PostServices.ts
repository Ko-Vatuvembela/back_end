import Postagem from 'App/Models/Postagem';
export class PostServices {
  public create = async (utilizadorFK: number, linguaFK: number, conteudo: string) => {
    const { $attributes } = await Postagem.create({ utilizadorFK, linguaFK, conteudo });
    return $attributes;
  };
  public getByID = async (idPostagem: number, linguaFK: number) => {
    const data = await Postagem.query().preload('idLingua').where({ idPostagem, linguaFK });
    return data;
  };
  public getAllPosts = async (linguaFK: number) => {
    // const data = await Postagem.query().where({ linguaFK });
    const data = await Postagem.findBy('lingua_fk', linguaFK);
    return data;
  };
  public update = async (idPostagem: number, linguaFK: number, conteudo: string) => {
    const data = await Postagem.query().preload('idLingua').where({ idPostagem, linguaFK });
    if (data.length) {
      await Postagem.updateOrCreate({ idPostagem, linguaFK }, { conteudo });
      return true;
    }
    return false;
  };
  public delete = async (idPostagem: number, linguaFK: number) => {
    const data = await Postagem.query().preload('idLingua').where({ idPostagem, linguaFK });
    if (data.length) {
      await data[0].delete();
      return true;
    }
    return false;
  };
}
