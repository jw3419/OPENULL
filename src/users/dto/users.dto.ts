import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password?: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  public nickname: string;
}
