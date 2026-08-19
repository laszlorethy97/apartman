import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../calendar-component/calendar-component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateReservationDto } from '../../DTO/reservationDto/create-reservation-dto';
import { BookingService } from '../../services/booking-service';

@Component({
  selector: 'app-booking-component',
  imports: [CalendarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.scss',
})
export class BookingComponent {
  name: string = 'Laci';

  isInvalid = signal<boolean>(false);
  isConcurented = signal<boolean>(false);
  isInvalidDatum = signal<boolean>(false);
  isInvalidCouponOrUser = signal<boolean>(false);

  reservationGroup = new FormGroup({
    calendar: new FormControl<{startDate: Date, endDate: Date} | null>(null, Validators.required),
    couponCode: new FormControl<string>('', {nonNullable:true}),
    headCount: new FormControl<null | string>(null, Validators.required)
  });

  private readonly bookingService = inject(BookingService) 
  reservations$ = this.bookingService.findAll();

  constructor(
  ){}

  create(){
    if(this.reservationGroup.invalid){
      this.isInvalid.set(true);
      return;
    }
    const reservation = this.reservationGroup.getRawValue();
    if(!reservation.calendar) return;
    const createReservationDto: CreateReservationDto = {
      startDate: reservation.calendar.startDate,
      endDate: reservation.calendar.endDate,
      headCount: Number(reservation.headCount),
      couponCode: reservation.couponCode,
    }
    this.bookingService.create(createReservationDto).subscribe({
      next: (res) => {
        console.log(res.id);
      },
      error: (err) => {
        if(err.status == 400) this.isInvalidDatum.set(true);
        if(err.status == 404) this.isInvalidCouponOrUser.set(true);
        if(err.status == 409) this.isConcurented.set(true); 
      }
    });
  }
}
