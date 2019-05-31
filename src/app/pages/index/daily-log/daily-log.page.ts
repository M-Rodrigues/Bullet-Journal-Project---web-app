import { BulletHandlerService } from './../../../services/bullet-handler.service';
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
  old_entrada:any;

  constructor(
    private DLService: DailyLogService,
    private alertCtrl: AlertController,
    private bj: BulletHandlerService
  ) { 
    let date = new Date()
    this.today = {
      dia: date.getDate(),
      mes: date.getMonth()+1,
      ano: date.getFullYear()
    }
  }

  ngOnInit() {
    this.refreshEntradasLastMonth()
  }

  async criarNovaEntrada(dia_escolhido, id) {
    console.log(dia_escolhido)

    const alert = await this.alertCtrl.create({
      header: 'Nova Entrada',
      inputs: [
        { name: 'descricao', type: 'text', placeholder: 'Entrada Daily-Log' }
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
            this.DLService.criarEntrada(data.descricao,dia_escolhido.dia, dia_escolhido.mes, dia_escolhido.ano)
              .then((res:any) => {
                if (res.status === 0) {
                  // Adicionar lista                  
                  this.meu_dl[id].entradas.push(res.entrada)
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

  atualizarEntrada(entrada, entrada_id, dl_id) {
    // Atualizar entrada no Servidor
    this.showProgressBar = true
    this.DLService.atualizaEntrada(entrada)
      .then((res:any) => {
        if (res.status === 0) {
          this.meu_dl[dl_id].entradas[entrada_id] = entrada
        } else {
          console.log("Tratar erros ao atualizar entrada do daily-log")
        }
      })
      .catch((err:any) => {
        console.log(err)
        console.log("Tratar erros ao atualizar entrada do daily-log")

        this.bj.showToastError(err)
      })
      .finally(() => this.showProgressBar = false)
  }

  removerEntrada(entrada, entrada_id, dl_id) {
    this.showProgressBar = true
    this.DLService.removerEntrada(entrada.cod_entrada)
      .then((res:any) => {
        if (res.status === 0) {
          this.meu_dl[dl_id].entradas.splice(entrada_id, 1)
        } else {
          console.log(res)
          console.log("Tratar erros ao remover entrada do daily-log")
        }
      })
      .catch((err:any) => {
        console.log(err)
        console.log("Tratar erros ao remover entrada do daily-log")

        this.bj.showToastError(err)
      })
      .finally(() => this.showProgressBar = false)
  }

  private refreshEntradasLastMonth() {
    this.showProgressBar = true
    this.DLService.getEntradasLastMonth(this.today.dia, this.today.mes, this.today.ano)
      .then((res:any) => {
        console.log(res)
        if (res.status === 0) {
          res.data.map(el => { 
            if (el.entradas == null) 
              el.entradas = [] 
          })
          
          this.meu_dl = res.data
        } else {
          console.log("Tratar erros ao recuperar daily-log")
        }
      })
      .catch(err => {
        console.log(err)

        this.bj.showToastError(err)
      })
      .finally(() => this.showProgressBar = false)
  }
}
