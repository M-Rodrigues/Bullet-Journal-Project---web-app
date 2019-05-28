import { HttpClient } from '@angular/common/http';
import { FutureLogInterface } from './../interfaces/colecoes/future-log';
import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';
import { environment } from 'src/environments/environment';

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
    private calendar: CalendarService,
    private http: HttpClient
  ) { }

  criarEntrada(data) {
    console.log("::on Future Log service")
    console.log(data)

    return this.http.post(`${environment.SERVER_ADDR}/future-log`, data.data).toPromise()
  }

  atualizarEntrada() {

  }

  removerEntrada() {

  }

  apagarColeção() {

  }

  getEntradas() {
    return this.http.get(`${environment.SERVER_ADDR}/future-log`).toPromise()
  }

  getEntradasStatic() {
    return this.entradas;
  }
}
