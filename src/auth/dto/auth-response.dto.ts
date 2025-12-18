export class AuthResponseDto {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export class LoginResponseDto {
  user: AuthResponseDto;
  accessToken: string;
  refreshToken: string;
}
