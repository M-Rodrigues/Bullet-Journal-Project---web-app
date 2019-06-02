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

  constructor(
    private FLService: FutureLogService,
    private bj: BulletHandlerService
  ) { }

  ngOnInit() {
    this.refreshEntradasNextYear()
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
}
