import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FutureLogService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  /*  GET /future-log/full-year
    ::  consulta todas entradas de future log dos próximos 12 meses
    */
  getEntradasNextYear(mes, ano) {
    return this.auth.checkAuth(this.http.get(`${environment.SERVER_ADDR}/future-log/full-year/${mes}/${ano}`).toPromise())
  }

  /*  PUT /future-log
    ::  atualiza dados de uma entrada do future log
    */


  /*  POST /future-log
    ::  criar uma nova entrada no future log
    */
  criarEntrada(descricao, dia, mes, ano) {
    let body = {
      descricao: descricao,
      dia: dia,
      mes: mes,
      ano: ano,
      cod_tipo: 1
    }
    return this.auth.checkAuth(this.http.post(`${environment.SERVER_ADDR}/future-log/`, body).toPromise())
  }

  /*  DELETE /future-log/:id
    ::  remove o uma entrada do future log
    */

}
