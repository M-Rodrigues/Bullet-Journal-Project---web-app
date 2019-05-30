import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

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
  entradas_ftlog: any[] = []

  constructor(
    private ftlogService: FutureLogService,
    private modalCtrl: ModalController,
    private calendar: CalendarService,
    private bjHandler: BulletHandlerService
  ) { }

  ngOnInit() {
    console.log("::ngOnInit")
    this.entradas_ftlog = this.ftlogService.getEntradasStatic();
  
    this.updateEntradasMonth()

    this.ftlogService.getEntradasFullYear()
      .then(res => {
        console.log('Entradas Full Year')
        console.log(res)
      })
      .catch(err => {
        console.log('Entradas Full Year::Erro')
        console.log(err)
      })
  }

  async adicionarEntrada() {
    console.log("::adicionarEntrada")
    
    const modal = await this.modalCtrl.create({
      component: CriarEntradaFLogPage
    })    

    await modal.present();
    
    this.showProgressBar = true
    modal.onWillDismiss()
      .then((res:any) => {
        console.log("::onWillDismiss")

        res = res.data
        console.log(res)
        
        // Adicionar na lista de entradas
        let dia = parseInt(res.entrada.data.substring(0,2))
        let mes = parseInt(res.entrada.data.substring(2,4))
        let ano = parseInt(res.entrada.data.substring(4,8))       
        res.entrada.data = { dia:dia, mes:mes, ano:ano };
        
        this.entradas_ftlog.forEach(el => {
          console.log(el)
          if (el.data.mes == mes && el.data.ano == ano) {
            console.log('Encontrei!')
            el.entradas.push(res.entrada)
          }
        })

        // console.log(entrada)
      })
      .catch((err) => {
      })
      .finally(() => {
        this.showProgressBar = false
      })  
  }

  removerEntrada(entrada, flogId: number, entradaId: number) {
    console.log(flogId)
    console.log(entradaId)

    // TODO remover entrada no banco
    this.entradas_ftlog[flogId].entradas.splice(entradaId, 1)
  }

  getNomeMes(mes) {
    return this.calendar.getMonth(mes-1)
  }

  private updateEntradasMonth() {
    this.ftlogService.getEntradasMonth()
      .then((res:any) => {
        console.log('Entradas Month')
        console.log(res)
        if (res.status == 0) {
          this.entradas_ftlog = res.data
        }
      })
      .catch(err => {
        console.log('Entradas Month::Erro')
        console.log(err)
      })
  }
}
