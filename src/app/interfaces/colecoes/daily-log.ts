import { Entrada } from './../entrada';
import { ColeçãoInterface } from './colecao';

export interface DailyLogInterface extends ColeçãoInterface {
    migrarParaML(entrada: Entrada)
    migrarParaFL(entrada: Entrada)
}