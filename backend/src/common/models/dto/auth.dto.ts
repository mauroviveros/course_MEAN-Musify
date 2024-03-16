export class SignInAuthDto {
  readonly email?: string;
  password?: string;
}
export class SignUpAuthDto extends SignInAuthDto {
  readonly name?: string;
  readonly surname?: string;
}

export class AuthResponseDto {
  readonly token: string;
}
