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
export interface UserDto {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

