
import { IsString, IsEmail, Length, IsPhoneNumber, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  apellidos: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 80)
  correo: string;

  @IsPhoneNumber('CL')
  numTel?: string;

  @IsString()
  @Length(1, 80)
  direccion?: string;

  @IsNumber()
  @Length(1, 8)
  numero_direccion?: number;
}