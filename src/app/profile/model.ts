import {GroupDto} from "../group/model";

export interface UserUpdateDto {
  firstName: string;
  lastName:string;
  email:string;
}
export interface CreateUserDto {
  firstName: string;
  lastName:string;
  email:string;
}
export interface ChangePasswordDto{
  previousPassword:string;
  newPassword:string;
}

