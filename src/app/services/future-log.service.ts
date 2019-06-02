import { AuthenticationService } from './authentication.service';
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
    private http: HttpClient,
    private auth: AuthenticationService
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

  atualizaEntrada(entrada) {
    let body = {
      cod_entrada: entrada.cod_entrada,
      descricao: entrada.descricao,
      cod_prioridade: entrada.cod_prioridade,
      cod_status: entrada.cod_status,
      cod_tipo: entrada.cod_tipo
    }
    return this.auth.checkAuth(this.http.put(`${environment.SERVER_ADDR}/future-log`,body).toPromise())
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
