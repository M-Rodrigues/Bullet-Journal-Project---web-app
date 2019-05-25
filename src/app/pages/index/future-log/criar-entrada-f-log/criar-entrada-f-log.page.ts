import { CalendarService } from './../../../../services/calendar.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Entrada } from 'src/app/interfaces/entrada';

@Component({
  selector: 'app-criar-entrada-f-log',
  templateUrl: './criar-entrada-f-log.page.html',
  styleUrls: ['./criar-entrada-f-log.page.scss'],
})
export class CriarEntradaFLogPage implements OnInit {
  entrada:any = {}
  min_date:any = {}

  constructor(
    private modalCtrl: ModalController,
    private calendar: CalendarService
  ) { }

  ngOnInit() {
    this.set_min_day()
    // console.log(this.min_date)
  }

  onClose() {
    this.modalCtrl.dismiss()
  }

  criarEntrada(form:NgForm) {
    console.log(form.value)
    let entrada = form.value
    
    // TODO validar data escolhida
    
    let res = {
      descricao: entrada.descricao,
      data: {
        dia: parseInt(entrada.data.substring(8,10)),
        mes: parseInt(entrada.data.substring(5,7)),
        ano: parseInt(entrada.data.substring(0,4))
      },
      tipo: parseInt(entrada.tipo),
      signifier: parseInt(entrada.signi)
    }

    // console.log(res)
    this.modalCtrl.dismiss(res)
  }

  private set_min_day() {
    // console.log(this.calendar.nextMonthYear())
    let monthyear = this.calendar.nextMonthYear()
    // monthyear == {mes: 5, mes_nome: "Junho", ano: 2019}
    
    let day = '01'
    let month = monthyear.mes+1
    let year = monthyear.ano
    let months = ""

    if (month < 10) months = '0' + month
    else months = month.toString()

    this.min_date = year + '-' + months + '-' + day
  }
}
