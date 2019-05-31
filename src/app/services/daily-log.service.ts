import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyLogService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  /*  GET /daily-log/:id
    ::  consulta 1 entrada do daily-log
    */
  getEntrada(cod_entrada) {
    return this.auth.checkAuth(this.http.get(`${environment.SERVER_ADDR}/daily-log/${cod_entrada}`).toPromise())
  }
  
  /*  GET /daily-log/last-week
    ::  consulta as entradas de daily-log dentro de 1 semana
    */
  getEntradasLastWeek(dia, mes, ano) {
    return this.auth.checkAuth(this.http.get(`${environment.SERVER_ADDR}/daily-log/last-week/${dia}/${mes}/${ano}`).toPromise())
  }

  /*  GET /daily-log/last-month
    ::  consulta todas entradas de daily-log dentro de 1 mes
    */
  getEntradasLastMonth(dia, mes, ano) {
    return this.auth.checkAuth(this.http.get(`${environment.SERVER_ADDR}/daily-log/last-month/${dia}/${mes}/${ano}`).toPromise())
  }
  
    /*  GET /daily-log
    ::  consulta todas entradas de daily-log do usuario
    */
  getEntradasTotal() {
    return this.auth.checkAuth(this.http.get(`${environment.SERVER_ADDR}/daily-log`).toPromise())
  }

  /*  PUT /daily-log
    ::  atualiza dados de uma entrada do daily log
    */
  atualizaEntrada(entrada) {
    let body = {
      cod_entrada: entrada.cod_entrada,
      descricao: entrada.descricao,
      cod_prioridade: entrada.cod_prioridade,
      cod_status: entrada.cod_status,
      cod_tipo: entrada.cod_tipo
    }
    return this.auth.checkAuth(this.http.put(`${environment.SERVER_ADDR}/daily-log`,body).toPromise())
  }

  /*  POST /daily-log
   ::  criar uma nova entrada no daily log
    */
  criarEntrada(descricao, dia, mes, ano) {
    let body = {
      descricao: descricao,
      dia: dia,
      mes: mes,
      ano: ano,
      cod_tipo: 1
    }
    return this.auth.checkAuth(this.http.post(`${environment.SERVER_ADDR}/daily-log`,body).toPromise())
  }

  /*  DELETE /daily-log/:id
    ::  remove o uma entrada do daily log
    */
  removerEntrada(cod_entrada) {
    return this.auth.checkAuth(this.http.delete(`${environment.SERVER_ADDR}/daily-log/${cod_entrada}`).toPromise())
  }
}
