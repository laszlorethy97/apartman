import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking-service';

@Component({
  selector: 'app-booking-confirmed-component',
  imports: [],
  templateUrl: './booking-confirmed-component.html',
  styleUrl: './booking-confirmed-component.scss',
})
export class BookingConfirmedComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bookingService = inject(BookingService);
  private readonly platformId = inject(PLATFORM_ID);

  isLoading = signal<boolean>(true);
  reservationId = signal<number | null>(null);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.confirmReservation();
  }

  private confirmReservation(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (!sessionId) {
      this.navigateToError();
      return;
    }

    this.bookingService.confirmPayment(sessionId).subscribe({
      next: (res) => this.handleConfirmSuccess(res.id),
      error: () => this.navigateToError(),
    });
  }

  private handleConfirmSuccess(id: number): void {
    this.reservationId.set(id);
    this.isLoading.set(false);
  }

  private navigateToError(): void {
    this.router.navigate(['/something-went-wrong']);
  }
}