import { Component, SimpleChanges, inject, DestroyRef, Input, OnChanges, OnInit, forwardRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarService } from '../../services/calendar-service';
import { GetReservationDto } from '../../DTO/reservationDto/get-reservation-dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-calendar-component',
  imports: [CommonModule],
  templateUrl: './calendar-component.html',
  styleUrl: './calendar-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ],
})
export class CalendarComponent implements OnInit, OnChanges, ControlValueAccessor {

  private destroyRef = inject(DestroyRef);
  private subscription?: Subscription;
  @Input() reservations$!: Observable<GetReservationDto[]>;

  constructor(private calendarService: CalendarService){}


  writeValue(date: {startDate: Date, endDate: Date} | null): void {
    this.calendarService.greenDates = [];
    if(date){
      this.calendarService.greenDates.push(date.startDate);
      this.calendarService.greenDates.push(date.endDate);
      this.calendarService.createIntervall();
    }
  }

  private onChange: (date: {startDate: Date, endDate: Date} | null) => void = () => {};

  registerOnChange(fn: (date:{startDate: Date, endDate: Date} | null) => void): void {
    this.onChange = fn;
  }


  private onTouched: () => void = () => {};
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['reservations$']){
      this.subscription?.unsubscribe();
      this.subscription = this.reservations$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(reservations => {
          this.calendarService.redDates.set(this.calendarService.expandReservation(reservations));
      });
    }
  }

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
    this.onTouched();
    if(this.calendarService.greenDates.length >= 1){
      const startDate = this.calendarService.greenDates[0];
      const endDate = this.calendarService.greenDates[this.calendarService.greenDates.length - 1];
      this.onChange({startDate, endDate});
    }else{
      this.onChange(null);
    }
  }

  isGreen(day: Date | null): boolean{
    return this.calendarService.isGreen(day);
  }

  isRed(day: Date | null): boolean{
    return this.calendarService.isRed(day);
  }
}
