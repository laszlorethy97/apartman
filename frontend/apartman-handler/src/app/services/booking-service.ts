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


  create(createReservationDto: CreateReservationDto): Observable<ReservationResponseDto>{
    return this.httpClient.post<ReservationResponseDto>
    ('http://localhost:3000/reservation/create/1', createReservationDto);
  }

  findAll(): Observable<GetReservationDto[]>{
    return this.httpClient.get<GetReservationDto[]>('http://localhost:3000/reservation/find-all');
  }
}
