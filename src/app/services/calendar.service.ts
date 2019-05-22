import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private dias: string[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  private meses: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  private diasNoMes: number[] = [31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31]
  private date: Date

  constructor() { 
    this.date = new Date()
  }

  getDayOfWeek(id?) {
    if (!id) id = this.date.getDay()
    return this.dias[id];
  }

  getDay() {
    return this.date.getDate()
  }

  getMonth(id?) {
    if (!id) id = this.date.getMonth()
    return this.meses[id];
  }
  
  getDate() {
    return this.date.getDate()
  }

  getYear() {
    return this.date.getFullYear()
  }

  getDaysInMonth(mes, ano) {
    let ans = this.diasNoMes[mes]

    if (mes != 2 || this.isBissexto(ano)) return ans
    return ans+1
  }

  private isBissexto(ano) {
    return (ano%4 == 0 && ano%100 != 0) || (ano%4 != 0 && ano%400 == 0)
  }

  nextMonthYear() {
    let date = new Date()
    let m = date.getMonth()
    let y = date.getFullYear()

    if (m == 11) { m = 0, y++ }
    else m++

    return { mes: m, mes_nome: this.meses[m], ano: y}
  }
}
