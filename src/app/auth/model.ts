export interface AuthenticationDto {
  email: string;
  password:string;
}
export interface RegisterDto{
  firstName: string;
  lastName: string;
  email: string;
  password:string;
}
export interface UserDto {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface AuthenticationResponseDto {
  user: UserDto;
  accessToken: string;
}

