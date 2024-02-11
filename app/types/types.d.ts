import Significado from 'App/Models/Significado';

export type UserType = {
  uid?: number;
  nome: string;
  sobrenome: string;
  email: string;
  foto?: string;
  ativada?: boolean;
  password?: string;
};
export type UpdateUserType = {
  nome?: string;
  sobrenome?: string;
  email?: string;
  ativada?: boolean;
  foto?: string;
  password?: string;
};
export type SendMailType = {
  to: string;
  subject: string;
};
export type WordWithMeaningType = {
  palavra: string;
  significados: Array<Significado>;
};
export type UpdateNMeaningType = {
  significado: string;
  exemplo: string;
  classeGramaticalFK: number;
  idSignificado: number;
};
export type QuoteMap = {
  idProverbio?: number;
  proverbio: string;
  utilizadorFK: number;
  explicacao: string;
  linguaFK: number;
  data?: string;
};

export interface IBibliografia {
  idBibliografia?: number;
  titulo: string;
  tipo: string;
  nomeAutor: string;
  sobrenomeAutor: string;
  ano: number;
}
export interface ILivro {
  bibliografiaFK?: IBibliografia | number;
  editora: string;
  localPublicacao: string;
  edicao: number;
}
export interface IArtigo {
  bibliografiaFK?: IBibliografia | number;
  numeroPaginas: number;
}
export interface ITese {
  bibliografiaFK?: IBibliografia | number;
  grau: string;
  nomeInstituicao: string;
}
export interface ILingua {
  id: number;
  lingua: string;
}
export interface IPostagem {
  idPostagem: number;
  titulo: string;
  conteudo: string;
  categoria: string;
  utilizadorFK: UserType | number;
  linguaFK: ILingua | number;
  bibliografiaFK: IBibliografia | number;
}
