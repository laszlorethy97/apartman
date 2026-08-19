import { Injectable } from '@angular/core';
import { CreateReservationDto } from '../DTO/reservationDto/create-reservation-dto';
import { ReservationResponseDto } from '../DTO/reservationDto/reservation-response-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetReservationDto } from '../DTO/reservationDto/get-reservation-dto';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  constructor(private readonly httpClient: HttpClient){}


  createCheckoutSession(dto: CreateReservationDto): Observable<{ url: string }> {
    return this.httpClient.post<{ url: string }>(
      'http://localhost:3000/payments/checkout-session',
      dto,
    );
  }

  confirmPayment(sessionId: string): Observable<ReservationResponseDto> {
    return this.httpClient.get<ReservationResponseDto>(
      `http://localhost:3000/payments/confirm?session_id=${sessionId}`,
    );
  }

  findAll(): Observable<GetReservationDto[]>{
    return this.httpClient.get<GetReservationDto[]>('http://localhost:3000/reservation/find-all');
  }
}
