export type UserType = {
  uid?: string;
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
