import { HttpClient } from '@angular/common/http';
import { FutureLogInterface } from './../interfaces/colecoes/future-log';
import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FutureLogService {
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

    let body = {
      descricao: data.descricao,
      dia: data.data.dia,
      mes: data.data.mes,
      ano: data.data.ano,
      cod_tipo: data.tipo
    }

    return this.http.post(`${environment.SERVER_ADDR}/future-log`, body).toPromise()
  }

  atualizarEntrada() {

  }

  removerEntrada() {

  }

  apagarColeção() {

  }

  getEntradasMonth() {
    let date = new Date()
    return this.http.get(`${environment.SERVER_ADDR}/future-log/${date.getMonth()+1}/${date.getFullYear()}`).toPromise()
  }
  getEntradasFullYear() {
    let date = new Date()
    return this.http.get(`${environment.SERVER_ADDR}/future-log/full-year/${date.getMonth()+1}/${date.getFullYear()}`).toPromise()
  }

  getEntradas() {
    return this.http.get(`${environment.SERVER_ADDR}/future-log`).toPromise()
  }

  getEntradasStatic() {
    return this.entradas;
  }
}
