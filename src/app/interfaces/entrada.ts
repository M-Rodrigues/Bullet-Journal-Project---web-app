export interface Prioridade {
    cod_propriedade: number;
    descricao: string;
}

export interface Status {
    cod_status: number;
    descricao: string;
}

export interface Tipo {
    cod_tipo: number;
    descricao: string;
}


export interface Entrada {
    cod_entrada: number;
    descricao: string;
    data?: Date;
    tipo: Tipo;
    status: Status;
    prioridade: Prioridade;
    filhas: Entrada[];
}

export interface EntradaInterface {
    criarEntrada(pai:Entrada, filha: Entrada);
}
