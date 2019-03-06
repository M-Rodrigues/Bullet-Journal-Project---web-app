import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      { path: 'daily-log',              loadChildren: './daily-log/daily-log.module#DailyLogPageModule' },
      { path: 'monthly-log',            loadChildren: './monthly-log/monthly-log.module#MonthlyLogPageModule' },
      { path: 'future-log',             loadChildren: './future-log/future-log.module#FutureLogPageModule' },
      { path: 'custom-collections/:id', loadChildren: './custom-collections/custom-collections.module#CustomCollectionsPageModule' },
      { path: 'profile',                loadChildren: './profile/profile.module#ProfilePageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {}
