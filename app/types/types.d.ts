export type UserType = {
  uid?: string;
  nome: string;
  sobrenome: string;
  email: string;
  foto?: string;
  password?: string;
};
export type UpdateUserType = {
  nome?: string;
  sobrenome?: string;
  email?: string;
  foto?: string;
  password?: string;
};
