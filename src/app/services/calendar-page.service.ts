import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarPageInterface } from '../interfaces/colecoes/calendar-page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarPageService {

  constructor(
    private http: HttpClient
  ) { }

  criarEntrada(descricao, dia, mes, ano) {
    let novaEntrada = {
      dia: dia,
      mes: mes,
      ano: ano,
      descricao: descricao           
    }
      
    return this.http.post(`${environment.SERVER_ADDR}/monthly-log/cp`, novaEntrada).toPromise()
  }

  atualizarEntrada(entrada) {
    
    /* Modelo dos de como os dados devem ir para o servidor */
    let body = {
      cod_entrada: entrada.cod_entrada,
      descricao: entrada.descricao,
      cod_prioridade: entrada.cod_prioridade,
      cod_status: entrada.cod_status
    }
    return this.http.put(`${environment.SERVER_ADDR}/monthly-log/cp`, body).toPromise()
  }

  removerEntrada(cod_entrada) {
    return this.http.delete(`${environment.SERVER_ADDR}/monthly-log/cp/${cod_entrada}`).toPromise()
  }

  getEntradasMonthYear(month, year) {
    return this.http.get(`${environment.SERVER_ADDR}/monthly-log/cp/${month}/${year}`).toPromise()
  }

  apagarColeção() {

  }
}
