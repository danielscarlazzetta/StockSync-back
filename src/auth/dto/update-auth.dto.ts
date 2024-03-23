import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  nombres?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  apellidos?: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 80)
  correo?: string;

  @IsPhoneNumber('CL')
  numTel?: string;

  @IsString()
  @Length(1, 80)
  direccion?: string;

  @IsNumber()
  @Length(1, 8)
  numero_direccion?: number;
}
