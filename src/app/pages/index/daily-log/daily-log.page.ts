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

  constructor(
    private DLService: DailyLogService
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
          this.meu_dl = res.data
        } else {
          // Tratar os erros aqui
        }
      })
      .catch(err => console.log(err))
  }

}
