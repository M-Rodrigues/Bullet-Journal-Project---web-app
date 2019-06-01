import { Entrada } from './../entrada';

export interface Coleção {
    cod_colecao: number;
    nome: string;
    entradas: Entrada[];
}

export interface ColeçãoInterface {
    criarEntrada(entrada: Entrada)
    atualizarEntrada(entrada: Entrada)
    removerEntrada(entrada: Entrada)
    apagarColeção()
}
