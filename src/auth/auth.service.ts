import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async create(createUserDto: CreateAuthDto): Promise<Auth> {
    try {
      const newUser = new Auth();
      newUser.nombres = createUserDto.nombres;
      newUser.apellidos = createUserDto.apellidos;
      newUser.correo = createUserDto.correo;
      newUser.direccion = createUserDto.direccion;
      newUser.numero_direccion = createUserDto.numero_direccion;
      newUser.numTel = createUserDto.numTel;

      return await this.authRepository.save(newUser);

    } catch (error) {
      throw new InternalServerErrorException('Algo ha ocurrido');
    }
  }


  async findAll(): Promise<Auth[]> {
    try {
      return await this.authRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('error');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
