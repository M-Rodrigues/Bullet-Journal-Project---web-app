import { Injectable } from '@angular/core';
import { TaskPageInterface } from '../interfaces/colecoes/task-page';
import { CalendarService } from './calendar.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskPageService implements TaskPageInterface{

  constructor(
    private calendarService : CalendarService,
    private http : HttpClient
  ) { }

  criarEntrada(descricao) {
    let novaEntrada = {
      dia: (new Date()).getDate(),
      mes: (new Date()).getMonth()+1,
      ano: (new Date()).getFullYear(),
      descricao: descricao           
    }
  
    return this.http.post(`${environment.SERVER_ADDR}/monthly-log/tp`, novaEntrada).toPromise()
  }

  atualizarEntrada() {

    // /* Modelo dos de como os dados devem ir para o servidor */
    // let body = {
    //   cod_entrada: ...,
    //   descricao: ...,
    //   cod_prioridade: ...,
    //   cod_status: ...,
    // }
    // return this.http.post(`${environment.SERVER_ADDR}/monthly-log/tp`, body).toPromise()
  }

  removerEntrada(cod_entrada) {
    return this.http.delete(`${environment.SERVER_ADDR}/monthly-log/tp/${cod_entrada}`).toPromise()
  }

  apagarColeção() {
    
  }

  getEntradas() {
    return [
      {
        name: "Preparar apresentação de Lab Prog",
        signifierId: 0,
        nested: "",
        irrelevant: false,
        complete: false
      },
      {
        name: "Fazer trabalho de Microproc",
        signifierId: 1,
        nested:"Fulano",
        irrelevant: false,
        complete: false
      },
      {
        name: "Estudar para as VFs",
        signifierId: 2,
        nested: "",
        irrelevant: false,
        complete: false
      },
      {
        name: "Fazer trabalho de BD",
        signifierId: 0,
        nested: "Yaaaay",
        irrelevant: false,
        complete: false
      }
    ]
  }
}
