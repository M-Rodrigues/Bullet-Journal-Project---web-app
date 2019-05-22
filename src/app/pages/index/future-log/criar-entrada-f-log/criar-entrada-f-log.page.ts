import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-criar-entrada-f-log',
  templateUrl: './criar-entrada-f-log.page.html',
  styleUrls: ['./criar-entrada-f-log.page.scss'],
})
export class CriarEntradaFLogPage implements OnInit {
  user:any = {}

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    
  }

  onClose() {
    this.modalCtrl.dismiss()
  }

  criarEntrada(form:NgForm) {
    console.log(form)
    
    this.modalCtrl.dismiss(form.value)
  }
}
