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
  entradas_ftlog: any[] = []

  constructor(
    private ftlogService: FutureLogService,
    private modalCtrl: ModalController,
    private calendar: CalendarService
  ) { }

  ngOnInit() {
    console.log("::FutureLog::onInit")
    
    this.entradas_ftlog = this.ftlogService.getEntradas();
    console.log(this.entradas_ftlog)
  }

  async adicionarEntrada() {
    console.log("::adicionarEntrada")
    console.log(this.calendar.nextMonthYear())

    const modal = await this.modalCtrl.create({
      component: CriarEntradaFLogPage
    })    

    await modal.present();
    
    modal.onWillDismiss()
      .then((data) => {
        console.log("::onWillDismiss")
        console.log(data)
      })
      .catch((err) => {

      })
      .finally(() => {

      })  

  }

}
