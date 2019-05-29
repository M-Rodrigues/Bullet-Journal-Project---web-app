import { BulletHandlerService } from './../../../services/bullet-handler.service';
import { HttpClient } from '@angular/common/http';
import { CriarEntradaFLogPage } from './criar-entrada-f-log/criar-entrada-f-log.page';
import { CalendarService } from './../../../services/calendar.service';
import { ModalController } from '@ionic/angular';
import { FutureLogService } from './../../../services/future-log.service';
import { Component, OnInit } from '@angular/core';
import { Entrada } from 'src/app/interfaces/entrada';
import { environment } from 'src/environments/environment';

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
    console.log(this.entradas_ftlog)
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

        let entrada:Entrada = res.data
        // console.log(entrada)

        // Adicionar na lista de entradas
        this.entradas_ftlog.forEach(mes => {
          // console.log(mes)
          if (mes.data.mes == entrada.data.mes && mes.data.ano == entrada.data.ano) {
            mes.entradas.push(entrada)
          }
        })
      })
      .catch((err) => {
      })
      .finally(() => {
        this.showProgressBar = false
      })  
  }

  removerEntrada(entrada: Entrada, flogId: number, entradaId: number) {
    console.log(flogId)
    console.log(entradaId)

    // TODO remover entrada no banco
    this.entradas_ftlog[flogId].entradas.splice(entradaId, 1)
  }

  getNomeMes(mes) {
    return this.calendar.getMonth(mes-1)
  }
}
