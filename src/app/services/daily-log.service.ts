import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyLogService {

  constructor(
    private http: HttpClient
  ) { }

  /*  GET /daily-log/:id
    ::  consulta 1 entrada do daily-log
    */
  getEntrada(cod_entrada) {
    return this.http.get(`${environment.SERVER_ADDR}/daily-log/${cod_entrada}`).toPromise()
  }
  
  /*  GET /daily-log/last-week
    ::  consulta as entradas de daily-log dentro de 1 semana
    */
  getEntradasLastWeek(dia, mes, ano) {
    return this.http.get(`${environment.SERVER_ADDR}/daily-log/last-week/${dia}/${mes}/${ano}`).toPromise()
  }

  /*  GET /daily-log/last-month
    ::  consulta todas entradas de daily-log dentro de 1 mes
    */
  getEntradasLastMonth(dia, mes, ano) {
    return this.http.get(`${environment.SERVER_ADDR}/daily-log/last-month/${dia}/${mes}/${ano}`).toPromise()
  }
  
    /*  GET /daily-log
    ::  consulta todas entradas de daily-log do usuario
    */
  getEntradasTotal() {
    return this.http.get(`${environment.SERVER_ADDR}/daily-log`).toPromise()
  }

  /*  PUT /daily-log
    ::  atualiza dados de uma entrada do daily log
    */
  atualizaEntrada() {
    return this.http.put(`${environment.SERVER_ADDR}/daily-log`,{}).toPromise()
  }

  /*  POST /daily-log
   ::  criar uma nova entrada no daily log
    */

  /*  DELETE /daily-log/:id
    ::  remove o uma entrada do daily log
    */
}
