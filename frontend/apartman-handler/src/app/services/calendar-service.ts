import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  calendar!: (Date | null)[][]
  private timeStamp: Date = new Date();
  currentDate!: Date;
  currentYear!: number;
  currentMonth!: number;
  firstDateOfMonth!: Date;
  dayWeekIndex!: number;
  totalDays!: number;
  offset: number = 0;
  redDates: Date[] = [new Date('2026-07-17'), new Date('2026-07-20'), new Date('2026-08-05')];
  greenDates: Date[] = [];

  getActualDate(timeOffset: number) {
    this.currentDate = new Date(this.timeStamp.getFullYear(), this.timeStamp.getMonth() + timeOffset, 1);
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.firstDateOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    this.dayWeekIndex = this.firstDateOfMonth.getDay();
    this.totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  }
  
  createCalendarMonth() {
    this.calendar = Array.from({length: 6}, () => Array(7).fill(null));
    let day: number = 1;
    this.calendar.forEach((column, columnIndex) => {
      column.forEach((item, index) => {
        if (columnIndex == 0 && index < this.dayWeekIndex) return;
        if (day > this.totalDays) return;
        this.calendar[columnIndex][index] = new Date(this.currentYear, this.currentMonth, day);
        day++;
      });
    });
  }

  isRed(day: Date | null): boolean{
    return this.redDates.some(
      rd => rd.getFullYear() === day?.getFullYear()
      && rd.getMonth() === day?.getMonth()
      && rd.getDate() === day?.getDate());
  }

  isGreen(day: Date | null): boolean{
    return this.greenDates.some(
      rd => rd.getFullYear() === day?.getFullYear()
      && rd.getMonth() === day?.getMonth()
      && rd.getDate() === day?.getDate());
  }

  isFuture(day: Date): boolean{
    return day.getTime() >= Date.now();
  }

  toggleGreenDates(day: Date){
    if (!day) return;
    if(this.isRed(day)) return;
    if(!this.isFuture(day)) return;
    if(this.greenDates.length === 0){
        this.greenDates.push(new Date(day));
    }else if(this.greenDates.length === 1){
        this.greenDates.push(new Date(day));
        this.createIntervall();
    }else if(!this.isGreen(day)){
        this.greenDates = [];
        this.greenDates.push(new Date(day));
    }else{
      this.truncateIntervallAt(day);
    }
  }

  truncateIntervallAt(day: Date){
    const index = this.greenDates.findIndex(d => d.getTime() === day.getTime());
    this.greenDates.splice(index + 1);
  }

  createIntervall(){
    this.greenDates.sort((a, b) => a.getTime() - b.getTime());
    let temp = new Date(this.greenDates[0]);
    temp.setDate(temp.getDate() + 1);
    const endDate = this.greenDates[this.greenDates.length - 1].getTime()
    while(temp.getTime() != endDate){
      if(this.isRed(temp)){
        this.greenDates = [];
        return;
      }
      this.greenDates.splice(this.greenDates.length - 1, 0, new Date(temp));
      temp.setDate(temp.getDate() + 1);
    }
  }

  init() {
    this.getActualDate(0);
    this.createCalendarMonth();
  }

  getNextMonth() {
    this.offset++;
    this.getActualDate(this.offset);
    this.createCalendarMonth();
  }

  getPreviousMonth() {
    this.offset--;
    this.getActualDate(this.offset);
    this.createCalendarMonth();
  }
}
