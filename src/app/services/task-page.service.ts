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
    // let novaEntrada = {
    //   dia: (new Date()).getDate(),
    //   mes: (new Date()).getMonth()+1,
    //   ano: (new Date()).getFullYear(),
    //   descricao: descricao           
    // }
    let novaEntrada = {
      dia: 28,
      mes: 5,
      ano: 2019,
      descricao: descricao           
    }
    return this.http.post(`${environment.SERVER_ADDR}/monthly-log/tp`, novaEntrada).toPromise()
  }

  atualizarEntrada() {

  }

  removerEntrada() {

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
