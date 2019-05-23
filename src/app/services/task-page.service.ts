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
