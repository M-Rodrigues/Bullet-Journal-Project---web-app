import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonthlyLogPage } from './monthly-log.page';
import { TaskPageComponent } from './task-page/task-page.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlyLogPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonthlyLogPage, TaskPageComponent, CalendarPageComponent]
})
export class MonthlyLogPageModule {}
