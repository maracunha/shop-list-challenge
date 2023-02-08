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
    email: string | FormDataEntryValue;
    password: string | FormDataEntryValue;
}
