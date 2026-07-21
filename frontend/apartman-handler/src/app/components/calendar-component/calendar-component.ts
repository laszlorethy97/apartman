import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-component',
  imports: [CommonModule],
  templateUrl: './calendar-component.html',
  styleUrl: './calendar-component.scss',
})
export class CalendarComponent implements OnInit {
  calendar!: (Date | null)[][]
  timeStamp: Date = new Date();
  currentDate!: Date;
  currentYear!: number;
  currentMonth!: number;
  firstDateOfMonth!: Date;
  dayWeekIndex!: number;
  totalDays!: number;
  offset: number = 0;
  redDates: Date[] = [new Date('2026-07-17'), new Date('2026-07-20'), new Date('2026-08-05')];
  greenDates: Date[] = [];

  ngOnInit() {
    this.getCurrentMonth();
  }

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

  toggleGreenDates(day: Date){
    if (!day) return;
    if(this.isGreen(day)) this.greenDates = this.greenDates.filter(d => !(
        d.getFullYear() === day.getFullYear()
        && d.getMonth() === day.getMonth()
        && d.getDate() === day.getDate()
      ));
    else if(!this.isRed(day)) this.greenDates.push(day);
  }

  getCurrentMonth() {
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
