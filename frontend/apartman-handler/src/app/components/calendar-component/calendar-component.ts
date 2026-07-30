import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../services/calendar-service';

@Component({
  selector: 'app-calendar-component',
  imports: [CommonModule],
  templateUrl: './calendar-component.html',
  styleUrl: './calendar-component.scss',
})
export class CalendarComponent implements OnInit {

  constructor(private calendarService: CalendarService){}

  ngOnInit() {
    this.calendarService.init();
  }

  get calendar(){
    return this.calendarService.calendar;
  }

  get currantDate(){
    return this.calendarService.currentDate;
  }

  nextMonth(){
    this.calendarService.getNextMonth();
  }

  prevMonth(){
    this.calendarService.getPreviousMonth();
  }

  selectDay(day: Date){
    this.calendarService.toggleGreenDates(day);
  }

  isGreen(day: Date | null): boolean{
    return this.calendarService.isGreen(day);
  }

  isRed(day: Date | null): boolean{
    return this.calendarService.isRed(day);
  }
}
