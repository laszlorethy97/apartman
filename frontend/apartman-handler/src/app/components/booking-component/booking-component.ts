import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar-component/calendar-component';

@Component({
  selector: 'app-booking-component',
  imports: [CalendarComponent],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.scss',
})
export class BookingComponent {
  name: string = 'Laci';
}
