import { Injectable } from '@angular/core';
import { TaskPageInterface } from '../interfaces/colecoes/task-page';

@Injectable({
  providedIn: 'root'
})
export class TaskPageService implements TaskPageInterface{

  constructor() { }

  criarEntrada() {

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
        name: "Oi la la la",
        signifierId: 0,
        nested: ""
      },
      {
        name: "Olá",
        signifierId: 1,
        nested:"Fulano"
      },
      {
        name: "Yeah",
        signifierId: 2,
        nested: ""
      },
      {
        name: ":)))",
        signifierId: 0,
        nested: "Yaaaay"
      }
    ]
  }
}
