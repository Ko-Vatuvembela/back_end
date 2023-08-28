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
  data: Date;
};
