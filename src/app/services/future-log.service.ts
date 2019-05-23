import { FutureLogInterface } from './../interfaces/colecoes/future-log';
import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root'
})
export class FutureLogService implements FutureLogInterface {
  entradas: any[] = [
    {
      data: {
        mes: 5,
        ano: 2019
      },
      entradas: [
        {
          data: {
            dia: 21,
            mes: 5,
            ano: 2019
          },
          descricao: 'Trabalho USB'
        }
      ]
    }
  ]

  constructor(
    private calendar: CalendarService
  ) { }

  criarEntrada() {

  }

  atualizarEntrada() {

  }

  removerEntrada() {

  }

  apagarColeção() {

  }

  getEntradas() {
    // console.log(this.calendar.nextMonthYear())
    return this.entradas;
  }
}
