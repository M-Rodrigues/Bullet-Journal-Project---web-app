import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CriarEntradaFLogPage } from './criar-entrada-f-log.page';

const routes: Routes = [
  {
    path: '',
    component: CriarEntradaFLogPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CriarEntradaFLogPage]
})
export class CriarEntradaFLogPageModule {}
