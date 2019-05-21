import { CalendarService } from './../../../services/calendar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-monthly-log',
  templateUrl: './monthly-log.page.html',
  styleUrls: ['./monthly-log.page.scss'],
})
export class MonthlyLogPage implements OnInit {
  @ViewChild('slides') slides: IonSlides

  entradas_cp: any[] = []
  selectedPage:number = 0
  showProgressBar:boolean = false;
  
  slideOpts = {
    effect: 'flip'
  };
  
  constructor(
    private calendarService: CalendarService
  ) {
    
  }

  ngOnInit() {}

  ionViewWillEnter() {
    let date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    let days = this.calendarService.getDaysInMonth(month, year)

    for (let i = 1; i <= days; i++) {
      console.log((month+1) + ' ' + i + ' ' + year)
      let aux = (new Date((month+1) + ' ' + i + ' ' + year))
      console.log(aux)
      let obj = {
        day: i,
        dayOfWeek: this.calendarService.getDayOfWeek((aux.getDay())),
        month: month,
        year: year
      }

      this.entradas_cp.push(obj)
    }

    console.log(this.entradas_cp)
  }

  goCalendarPage() {
    this.activePage(0)
  }
  
  goTaskPage() {
    this.activePage(1)
  }
  
  private activePage(id) {
    this.slides.slideTo(id)
    this.selectedPage = id
  }

  getActiveMonth() {
    return this.calendarService.getMonth()
  }
}
