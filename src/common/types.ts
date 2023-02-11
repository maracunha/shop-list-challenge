export interface User {
  nome: string;
  sobrenome: string;
  cpf: number;
  sexo: string;
  dt_nascimento: number;
  cep: number;
  cidade: string;
  estado: string;
  logradouro: string;
  bairro: string;
  complemento: number;
  email: string;
  senha: string | null;
  token: string;
  image: string;
  id: number;
}

export interface InputUser {
  email: string;
  password: string;
}

export interface IProducts {
  createdAt: string;
  nome: string;
  avatar: string;
  preco: number;
  qt_estoque: number;
  qt_vendas: number;
  marca: string;
  id: number;
}


export interface IFormInputUser {
  name: string;
  surname: string;
  sexo: string;
  cpf: string;
  date: Date;
  email: string;
  password: string;
  cep: number | null;
  city: string;
  state: string;
  patio: string;
  neighborhood: string;
  complement: string;
}
