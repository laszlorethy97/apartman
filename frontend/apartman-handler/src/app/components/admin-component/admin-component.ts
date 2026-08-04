import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar-component/calendar-component';

@Component({
  selector: 'app-admin-component',
  imports: [CalendarComponent],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss',
})
export class AdminComponent {}
