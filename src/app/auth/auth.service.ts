import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthenticationDto, AuthenticationResponseDto, RegisterDto} from "./model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  addUser(registerDto: RegisterDto): Observable<AuthenticationResponseDto> {
    return this.http.post<AuthenticationResponseDto>('http://localhost:4000/api/v1/auth/register', registerDto);
  }
  login(authData: AuthenticationDto): Observable<AuthenticationResponseDto> {
    return this.http.post<AuthenticationResponseDto>('http://localhost:4000/api/v1/auth/login', authData);
  }


}
