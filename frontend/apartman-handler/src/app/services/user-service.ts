import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserDto } from '../DTO/userDto/create-user-dto';
import { LoginUserDto } from '../DTO/userDto/login-user-dto';
import { UserResponseDto } from '../DTO/userDto/user-response-dto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly httpClient: HttpClient,
  ){}

  public create(createUserDto: CreateUserDto): Observable<UserResponseDto>{
    return this.httpClient.post<UserResponseDto>('/api/user/create', createUserDto);
  }

  public login(loginUserDto: LoginUserDto): Observable<UserResponseDto>{
    return this.httpClient.post<UserResponseDto>('/api/user/login', loginUserDto);
  }
}
