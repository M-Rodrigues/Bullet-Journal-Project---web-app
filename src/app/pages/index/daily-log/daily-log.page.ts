import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DailyLogService } from 'src/app/services/daily-log.service';

@Component({
  selector: 'app-daily-log',
  templateUrl: './daily-log.page.html',
  styleUrls: ['./daily-log.page.scss'],
})
export class DailyLogPage implements OnInit {
  today:any;
  meu_dl:any[] = []

  showProgressBar:boolean = false;

  constructor(
    private DLService: DailyLogService,
    private alertCtrl: AlertController
  ) { 
    let date = new Date()
    this.today = {
      dia: date.getDate(),
      mes: date.getMonth()+1,
      ano: date.getFullYear()
    }
  }

  ngOnInit() {
    this.DLService.getEntradasLastMonth(this.today.dia, this.today.mes, this.today.ano)
      .then((res:any) => {
        console.log(res)

        if (res.status === 0) {
          res.data.map(el => { if (el.entradas == null) el.entradas = [] })
          this.meu_dl = res.data
        } else {
          // Tratar os erros aqui
        }
      })
      .catch(err => console.log(err))
  }

  async criarNovaEntrada(dia_escolhido, id) {
    console.log(dia_escolhido)

    const alert = await this.alertCtrl.create({
      header: 'Nova Entrada',
      inputs: [
        {
          name: 'descricao',
          type: 'text',
          placeholder: 'Entrada Daily-Log'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data:any) => {
            console.log('Confirm Ok');
            console.log(data)
            
            this.showProgressBar = true;
            this.DLService.criarEntrada(data.descricao,dia_escolhido.dia, dia_escolhido.mes, dia_escolhido.ano)
              .then((res:any) => {
                if (res.status === 0) {
                  // Adicionar lista

                  // if (!this.meu_dl[id].entradas)
                  //   this.meu_dl[id].entradas = []
                  
                  this.meu_dl[id].entradas.push(res.entrada)
                } else {
                  console.log(res)
                  console.log("Tratar erro ao criar entrada no Daily log")
                }
              })
              .catch((err:any) => {
                console.log(err)
                console.log("Tratar erro ao criar entrada no Daily log")
              })
              .finally(() => this.showProgressBar = false)
          }
        }
      ]
    });

    await alert.present();
  }

}
