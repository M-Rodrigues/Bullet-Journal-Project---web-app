import { ColeçãoInterface } from './colecao';
import { Entrada } from '../entrada';

export interface Personalizadas extends ColeçãoInterface {
    migrarEntrada(entrada: Entrada)
}