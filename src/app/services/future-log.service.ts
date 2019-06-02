import { HttpClient } from '@angular/common/http';
import { FutureLogInterface } from './../interfaces/colecoes/future-log';
import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FutureLogService {
  
  constructor(
    private http: HttpClient
  ) { }

  criarEntrada(descricao, dia, mes, ano) {
    console.log("::on Future Log service")

    let body = {
      descricao: descricao,
      dia: dia,
      mes: mes,
      ano: ano,
      cod_tipo: 1
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
