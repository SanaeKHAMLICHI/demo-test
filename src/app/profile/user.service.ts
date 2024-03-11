import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationResponseDto, RegisterDto, UserDto} from "../auth/model";
import {Observable} from "rxjs";
import {ChangePasswordDto, CreateUserDto, UserUpdateDto} from "./model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>('http://localhost:4000/api/v1/users');
  }
  addUser(createUserDto: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>('http://localhost:4000/api/v1/users', createUserDto);
  }
  getUser(userId: string): Observable<UserDto> {
    return this.http.get<UserDto>(`http://localhost:4000/api/v1/users/${userId}` );
  }
  deleteUser(userId: string) {
    return this.http.delete(`http://localhost:4000/api/v1/users/${userId}` );
  }
  editUser(userUpdateDto: UserUpdateDto , userId:string): Observable<UserDto> {
    return this.http.put<UserDto>(`http://localhost:4000/api/v1/users/${userId}` , userUpdateDto);
  }

  editPassword(changePasswordDto: ChangePasswordDto){
    console.log('Sending changePasswordDto:', changePasswordDto);
    return this.http.patch(`http://localhost:4000/api/v1/auth/change-password`, changePasswordDto);
  }


}
