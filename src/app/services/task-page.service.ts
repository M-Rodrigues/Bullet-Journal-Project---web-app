import { TaskPageInterface } from './../interfaces/colecoes/task-page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskPageService {

  constructor(
    private auth: AuthenticationService,
    private http : HttpClient
  ) { }

  criarEntrada(descricao,page_month_year) {
    let novaEntrada = {
      dia: (new Date()).getDate(),
      mes: page_month_year.mes,
      ano: page_month_year.ano,
      descricao: descricao   

    }
  
    return this.auth.checkAuth(this.http.post(`${environment.SERVER_ADDR}/monthly-log/tp`, novaEntrada).toPromise())
  }

  atualizarEntrada(entrada) {
    /* Modelo dos de como os dados devem ir para o servidor */
    let body = {
      cod_entrada: entrada.cod_entrada,
      descricao: entrada.name,
      cod_prioridade: entrada.signifierId + 2,
      cod_status: 0
    }
    if(body.cod_prioridade == 4) body.cod_prioridade = 1;
    if(entrada.complete) body.cod_status = 2
    else if(entrada.irrelevant) body.cod_status = 5
    else body.cod_status = 1

    return this.auth.checkAuth(this.http.put(`${environment.SERVER_ADDR}/monthly-log/tp`, body).toPromise())
  }

  removerEntrada(cod_entrada) {
    return this.auth.checkAuth(this.http.delete(`${environment.SERVER_ADDR}/monthly-log/tp/${cod_entrada}`).toPromise())
  }

  apagarColeção() {
    
  }

  getEntradasMonthYear(month, year) {
    return this.auth.checkAuth(this.http.get(`${environment.SERVER_ADDR}/monthly-log/tp/${month}/${year}`).toPromise())
  }
}
