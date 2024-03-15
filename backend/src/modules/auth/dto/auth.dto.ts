import { PartialType } from '@nestjs/mapped-types';

export class SignInAuthDto {
  readonly email: string;
  readonly password: string;
}
export class SignUpAuthDto extends PartialType(SignInAuthDto) {
  readonly name: string;
  readonly surname: string;
}

export class AuthResponseDto {
  readonly token: string;
}
