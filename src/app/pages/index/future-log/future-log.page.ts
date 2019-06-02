import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { CalendarService } from './../../../services/calendar.service';
import { FutureLogService } from './../../../services/future-log.service';
import { BulletHandlerService } from './../../../services/bullet-handler.service';

import { CriarEntradaFLogPage } from './criar-entrada-f-log/criar-entrada-f-log.page';

@Component({
  selector: 'app-future-log',
  templateUrl: './future-log.page.html',
  styleUrls: ['./future-log.page.scss'],
})
export class FutureLogPage implements OnInit {
  showProgressBar: boolean = false
  meu_fl: any[]

  constructor(
    private FLService: FutureLogService,
    private alertCtrl: AlertController,
    private calendar: CalendarService,
    private bj: BulletHandlerService
  ) { }

  ngOnInit() {
    console.log("::ngOnInit")
    
    this.showProgressBar = true;
    this.FLService.getEntradasFullYear()
      .then((res:any) => {
        console.log('Entradas Full Year')
        if (res.status === 0) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i] = res.data[i].doc

            if (res.data[i].entradas === null)
              res.data[i].entradas = []
          }
          this.meu_fl = res.data
        } else {
          console.log("Tratar erros na recuperação do future log")
        }
        console.log(res)
      })
      .catch(err => {
        console.log('Entradas Full Year::Erro')
        console.log(err)
      })
      .finally(() => this.showProgressBar = false)
  }

  async criarNovaEntrada(mes_escolhido, id) {
    console.log(mes_escolhido)

    const alert = await this.alertCtrl.create({
      header: 'Nova Entrada',
      inputs: [
        { name: 'descricao', type: 'text', placeholder: 'Entrada Future-Log' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: () => console.log('Confirm Cancel')
        }, {
          text: 'Ok',
          handler: (data:any) => {
            console.log('Confirm Ok');
            console.log(data)
            
            this.showProgressBar = true;
            this.FLService.criarEntrada(data.descricao,(new Date()).getDate(), mes_escolhido.mes, mes_escolhido.ano)
              .then((res:any) => {
                if (res.status === 0) {
                  // Adicionar lista                  
                  this.meu_fl[id].entradas.push(res.entrada)
                } else {
                  console.log(res)
                  console.log("Tratar erro ao criar entrada no Daily log")
                }
              })
              .catch((err:any) => {
                console.log(err)
                console.log("Tratar erro ao criar entrada no Daily log")
                this.bj.showToastError(err)
              })
              .finally(() => this.showProgressBar = false)
          }
        }
      ]
    });

    await alert.present();
  }

  removerEntrada(entrada, flogId: number, entradaId: number) {
    console.log(flogId)
    console.log(entradaId)

    // TODO remover entrada no banco
    this.meu_fl[flogId].entradas.splice(entradaId, 1)
  }

  getNomeMes(mes) {
    return this.calendar.getMonth(mes-1)
  }
}
