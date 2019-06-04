import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FutureLogService } from 'src/app/services/future-log.service';
import { BulletHandlerService } from 'src/app/services/bullet-handler.service';

@Component({
  selector: 'app-future-log',
  templateUrl: './future-log.page.html',
  styleUrls: ['./future-log.page.scss'],
})
export class FutureLogPage implements OnInit {
  showProgressBar:boolean = false

  meu_fl: any[] = []
  icon_tipo_name: any[] = ['assets/icon/task.svg','assets/icon/event.svg']
  icon_prioridade_name: any[] = ['','assets/icon/star.svg','assets/icon/warning.svg']


  constructor(
    private alertCtrl: AlertController,
    private FLService: FutureLogService,
    private bj: BulletHandlerService
  ) { }

  ngOnInit() {
    this.refreshEntradasNextYear()
  }




  async criarNovaEntrada(mes_atual, id) {
    console.log(mes_atual)

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
            
            this.showProgressBar = true;
            this.FLService.criarEntrada(data.descricao,(new Date()).getDate(), mes_atual.mes, mes_atual.ano)
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
    })

    await alert.present();
  }



  atualizarEntrada(entrada, entrada_id, fl_id) {
    // Atualizar entrada no Servidor
    this.showProgressBar = true
    this.FLService.atualizarEntrada(entrada)
      .then((res:any) => {
        if (res.status === 0) {
          this.meu_fl[fl_id].entradas[entrada_id] = entrada
        } else {
          console.log("Tratar erros ao atualizar entrada do future-log")
        }
      })
      .catch((err:any) => {
        console.log(err)
        console.log("Tratar erros ao atualizar entrada do future-log")

        this.bj.showToastError(err)
      })
      .finally(() => this.showProgressBar = false)
  }

  atualizarPrioridadeEntrada(entrada, entrada_id, fl_id) {
    entrada.cod_prioridade = (entrada.cod_prioridade % 3) + 1
    
    // Gambiarra do icone vazio
    if (entrada.cod_prioridade === 1) {
      entrada.show_icon = false
      setTimeout(() => entrada.show_icon = !entrada.show_icon, 1)
    }

    this.atualizarEntrada(entrada, entrada_id, fl_id)
  
  }

  atualizarTipoEntrada(entrada, entrada_id, fl_id) {
    entrada.cod_tipo = (entrada.cod_tipo % 2) + 1
    
    this.atualizarEntrada(entrada, entrada_id, fl_id)
  
  }

  atualizaStatusEntrada(cod, entrada, entrada_id, fl_id, meu_slide) { 

    this.meu_fl[fl_id].entradas[entrada_id].cod_status = cod
    meu_slide.close()

    this.atualizarEntrada(entrada, entrada_id, fl_id)
  }




  removerEntrada(entrada,entrada_id,fl_id) {
    this.showProgressBar = true
    this.FLService.removerEntrada(entrada.cod_entrada)
      .then((res:any) => {
        if (res.status === 0) {
          this.meu_fl[fl_id].entradas.splice(entrada_id, 1)
        } else {
          console.log(res)
          console.log("Tratar erros ao remover entrada do future-log")
        }
      })
      .catch((err:any) => {
        console.log(err)
        console.log("Tratar erros ao remover entrada do future-log")

        this.bj.showToastError(err)
      })
      .finally(() => this.showProgressBar = false)
  }


  private refreshEntradasNextYear() {
    let date = new Date()
    this.showProgressBar = true
    this.FLService.getEntradasNextYear(date.getMonth()+1, date.getFullYear())
      .then((res:any) => {
        if (res.status === 0) {
          for(let i = 0; i < res.data.length; i++) {
            res.data[i] = res.data[i].doc
          }
          
          res.data.map(el => { 
            if (el.entradas == null) 
            el.entradas = [] 
          })
          console.log(res)
          this.meu_fl = res.data
        } else {
          console.log("Tratar erros ao recuperar future-log")
        }
      })
      .catch(err => {
        console.log(err)

        this.bj.showToastError(err)
      })
      .finally(() => this.showProgressBar = false)
  }

  private get_prioridade_icon(entrada) {
    return this.icon_prioridade_name[entrada.cod_prioridade-1]
  }
  
  private get_tipo_icon(entrada) {
    if (entrada.cod_status === 2) {
      return 'assets/icon/complete.svg'
    }
    return this.icon_tipo_name[entrada.cod_tipo-1]

  }
}
