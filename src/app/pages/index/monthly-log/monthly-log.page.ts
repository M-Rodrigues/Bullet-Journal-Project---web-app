import { CalendarService } from './../../../services/calendar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';
import { TaskPageService } from 'src/app/services/task-page.service';
import { BulletHandlerService } from 'src/app/services/bullet-handler.service';

@Component({
  selector: 'app-monthly-log',
  templateUrl: './monthly-log.page.html',
  styleUrls: ['./monthly-log.page.scss'],
})
export class MonthlyLogPage implements OnInit {
  // @ViewChild('slides') slides: IonSlides
  
  entradas_cp: any[] = []
  entradas_tp: any[] = []
  signifier_tp: any[] = ["star","alert"]
  signifier_color_tp: any[] = ["goldenrod","pink"]
  bulletIcon: any[] = ["https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png","https://cdn0.iconfinder.com/data/icons/modagraphica-interface/30/cancel-512.png"]
  selectedPage:number = 0
  showProgressBar:boolean = false;
   
  slideOpts = {
    effect: 'flip'
  };
  
  constructor(
    private calendarService: CalendarService,
    private taskService: TaskPageService,
    private alertCtrl: AlertController
  ) {
  }
  
  // ionViewDidEnter() { 
  //   console.log(this.slides)
  //   this.slides.lockSwipes(true) 
  // } 


  getIconName(id) {
    return this.signifier_tp[id]
  }

  getIconColor(id) {
    return this.signifier_color_tp[id]
  }

  ngOnInit() {
    this.entradas_tp = this.taskService.getEntradas()
    // this.entradas_tp.map((entr) => {
    //   entr.sign_icon_name = this.getIconName(entr.signifierId)
    // })
  }

  // ionViewWillEnter() {
  //   let date = new Date()
  //   let month = date.getMonth()
  //   let year = date.getFullYear()
  //   let days = this.calendarService.getDaysInMonth(month, year)

  //   for (let i = 1; i <= days; i++) {
  //     console.log((month+1) + ' ' + i + ' ' + year)
  //     let aux = (new Date((month+1) + ' ' + i + ' ' + year))
  //     console.log(aux)
  //     let obj = {
  //       day: i,
  //       dayOfWeek: this.calendarService.getDayOfWeek((aux.getDay())),
  //       month: month,
  //       year: year
  //     }

  //     this.entradas_cp.push(obj)
  //   }

  //   console.log(this.entradas_cp)
  // }

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

  async criarNovaEntradaTaskPage(){
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
            setTimeout(() => {
              this.showProgressBar = false  
            }, 2000)

            
            this.taskService.criarEntrada(data.name)
              .then((data)=> {
                console.log(data)

                /* ... */
              })
              .catch((error)=> {
                console.log(error)
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
    this.entradas_tp.splice(tp_id,1)
  }

  changeIrrelevantTask(id) {
    this.entradas_tp[id].irrelevant = !(this.entradas_tp[id].irrelevant);
  }

  getBulletSrc(id){
    if (this.entradas_tp[id].complete) {
      return this.bulletIcon[1];
    } 
    else{
      return this.bulletIcon[0]
    }
  }
  
  changeStatusTask(id){
    this.entradas_tp[id].complete = !(this.entradas_tp[id].complete);
  }

}
