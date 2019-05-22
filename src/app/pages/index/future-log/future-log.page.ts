import { CriarEntradaFLogPage } from './criar-entrada-f-log/criar-entrada-f-log.page';
import { CalendarService } from './../../../services/calendar.service';
import { ModalController } from '@ionic/angular';
import { FutureLogService } from './../../../services/future-log.service';
import { Component, OnInit } from '@angular/core';

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
    private calendar: CalendarService
  ) { }

  ngOnInit() {
    console.log("::ngOnInit")
    this.entradas_ftlog = this.ftlogService.getEntradas();
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
      .then((entrada) => {
        console.log("::onWillDismiss")
        console.log(entrada)
        let aux_ano = parseInt(entrada.data.data.substring(0,4))
        let aux_mes = parseInt(entrada.data.data.substring(5,7))

        // Adicionar na lista de entradas
        this.entradas_ftlog.forEach(mes => {
          console.log(mes)
          if (mes.data.mes == aux_mes && mes.data.ano == aux_ano) {
            mes.entradas.push(entrada)
          }
        })
        // TODO adicionar no BD
      })
      .catch((err) => {
      })
      .finally(() => {
        this.showProgressBar = false
      })  
  }
}
