import { CalendarService } from './../../../services/calendar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController, PickerController } from '@ionic/angular';
import { TaskPageService } from 'src/app/services/task-page.service';
import { BulletHandlerService } from 'src/app/services/bullet-handler.service';
import { CalendarPageService } from 'src/app/services/calendar-page.service';

@Component({
  selector: 'app-monthly-log',
  templateUrl: './monthly-log.page.html',
  styleUrls: ['./monthly-log.page.scss'],
})
export class MonthlyLogPage implements OnInit {
  // @ViewChild('slides') slides: IonSlides
  page_month: any
  entradas_cp: any[] = []
  entradas_tp: any[] = []
  signifier_tp: any[] = ["star", "alert"]
  signifier_color_tp: any[] = ["goldenrod", "pink"]
  bulletIcon: any[] = ["https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png", "https://cdn0.iconfinder.com/data/icons/modagraphica-interface/30/cancel-512.png"]
  selectedPage: number = 0
  showProgressBar: boolean = false;

  slideOpts = {
    effect: 'flip'
  };

  constructor(
    private calendarService: CalendarService,
    private taskService: TaskPageService,
    private calendarPageService: CalendarPageService,
    private alertCtrl: AlertController,
    private pickerCtrl: PickerController
  ) {

    /* TESTE PARA RECUPERAR AS ENTRADAS DA TASK PAGE */
    this.taskService.getEntradasMonthYear((new Date()).getMonth() + 1, (new Date()).getFullYear())
      .then(res => {
        console.log("Sucesso GET ENTRADAS TP")
        console.log(res)
      })
      .catch(err => {
        console.log("Erro GET ENTRADAS TP")
        console.log(err)
      })

    /* TESTE PARA RECUPERAR AS ENTRADAS DA CALENDAR PAGE */
    this.calendarPageService.getEntradasMonthYear((new Date()).getMonth() + 1, (new Date()).getFullYear())
      .then(res => {
        console.log("Sucesso GET ENTRADAS CP")
        console.log(res)
      })
      .catch(err => {
        console.log("Erro GET ENTRADAS CP")
        console.log(err)
      })

  }

  async openPicker() {
    const picker = await this.pickerCtrl.create({
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Done',
          handler: (input) => {
            console.log(input);
            this.taskService.getEntradasMonthYear(input.months.value, input.years.value)
              .then((res: any) => {
                if(res.data.entradas===null) res.data.entradas=[]

                res.data.entradas.map(entrada => {
                  entrada.signifierId = entrada.cod_prioridade-2
                  if (entrada.signifierId<0) {entrada.signifierId=2}
                  entrada.irrelevant= (entrada.cod_status==5)
                  entrada.complete= (entrada.cod_status==2)
                  entrada.name = entrada.descricao
                })

                this.entradas_tp = res.data.entradas
                this.page_month = res.data.nome_mes
                console.log(res)
              })

              .catch( (err) => {
                console.log(err);
              })
          }

        }],
      columns: [
        {
          name: 'months',
          options: [
            { text: 'Janeiro', value: 1 },
            { text: 'Fevereiro', value: 2 },
            { text: 'Março', value: 3 },
            { text: 'Abril', value: 4 },
            { text: 'Maio', value: 5 },
            { text: 'Junho', value: 6 },
            { text: 'Julho', value: 7 },
            { text: 'Agosto', value: 8 },
            { text: 'Setembro', value: 9 },
            { text: 'Outubro', value: 10 },
            { text: 'Novembro', value: 11 },
            { text: 'Dezembro', value: 12 },
          ]
        },
        {
          name: 'years',
          options: [
            { text: '2019', value: 2019 },
            { text: '2020', value: 2020 },
            { text: '2021', value: 2021 },
            { text: '2022', value: 2022 },
            { text: '2023', value: 2023 },
            { text: '2024', value: 2024 },
            { text: '2025', value: 2025 },
            { text: '2026', value: 2026 },
            { text: '2027', value: 2027 },
            { text: '2028', value: 2028 },
            { text: '2029', value: 2029 },
            { text: '2030', value: 2030 },
            { text: '2031', value: 2031 },
            { text: '2032', value: 2032 },
            { text: '2033', value: 2033 },
            { text: '2034', value: 2034 },
            { text: '2035', value: 2035 },
            { text: '2036', value: 2036 },
            { text: '2037', value: 2037 },
            { text: '2038', value: 2038 },
            { text: '2039', value: 2039 },
            { text: '2040', value: 2040 },
            { text: '2041', value: 2041 },
            { text: '2042', value: 2042 },
            { text: '2043', value: 2043 },
            { text: '2044', value: 2044 },
            { text: '2045', value: 2045 },
          ]
        },
      ]
    });
    await picker.present();
  }


  getIconName(id) {
    return this.signifier_tp[id]
  }

  getIconColor(id) {
    return this.signifier_color_tp[id]
  }

  ngOnInit() {
    let date = new Date()
    this.taskService.getEntradasMonthYear(date.getMonth()+1,date.getFullYear())
    .then( (res : any) =>{
      if(res.data.entradas===null) res.data.entradas=[]

      res.data.entradas.map(entrada => {
        entrada.signifierId = entrada.cod_prioridade-2
        if (entrada.signifierId<0) {entrada.signifierId=2}
        entrada.irrelevant= (entrada.cod_status==5)
        entrada.complete= (entrada.cod_status==2)
        entrada.name = entrada.descricao
      })

      this.entradas_tp = res.data.entradas
      this.page_month = res.data.nome_mes
      console.log(res)
    })

    .catch( (err) => {
      console.log(err);
    })
  } 

  goCalendarPage() {
    this.activePage(0)
  }

  goTaskPage() {
    this.activePage(1)
  }

  private activePage(id) {
    // this.slides.slideTo(id)
    this.selectedPage = id
  }

  getActiveMonth() {
    return this.calendarService.getMonth()
  }

  async criarNovaEntradaTaskPage() {
    console.log("criando nova entrada")
    const alert = await this.alertCtrl.create({
      header: 'Nova tarefa',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Terminar Bullet Journal...'
        },
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
          handler: (data) => {
            console.log('Confirm Ok');
            console.log(data)
            let obj = {
              name: data.name,
              signifierId: 2,
              nested: ""
            }

            this.showProgressBar = true
            // setTimeout(() => {
            //   this.showProgressBar = false  
            // }, 2000)


            this.taskService.criarEntrada(data.name)
              .then((data) => {
                console.log(data)

                /* ... */
              })
              .catch((error) => {
                console.log(error)
              })
              .finally(() => {
                this.showProgressBar = false
              })

            this.entradas_tp.push(obj)
          }
        }
      ]
    })

    await alert.present();
  }

  changeSign(entrada) {
    entrada.signifierId = (entrada.signifierId + 1) % 3
  }

  removerTarefa(tp_id) {
    this.entradas_tp.splice(tp_id, 1)
  }

  changeIrrelevantTask(id) {
    this.entradas_tp[id].irrelevant = !(this.entradas_tp[id].irrelevant);
  }

  getBulletSrc(id) {
    if (this.entradas_tp[id].complete) {
      return this.bulletIcon[1];
    }
    else {
      return this.bulletIcon[0]
    }
  }

  changeStatusTask(id) {
    this.entradas_tp[id].complete = !(this.entradas_tp[id].complete);
  }

}
