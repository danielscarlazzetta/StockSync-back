import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { format } from 'date-fns';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) { }

  //! CREATE
  async create(createUserDto: CreateAuthDto): Promise<Auth> {
    try {
      const existingUser = await this.authRepository.findOne({ where: { correo: createUserDto.correo } });

      if (existingUser) {
        throw new ConflictException('El correo electrónico ya está en uso');
      } else {
        const newUser = this.mapCreateUserDtoToAuthEntity(createUserDto);
        return await this.authRepository.save(newUser);
      }

    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Algo ha ocurrido');
    }
  }

  private mapCreateUserDtoToAuthEntity(createUserDto: CreateAuthDto): Auth {
    const newUser = new Auth();
    newUser.nombres = createUserDto.nombres;
    newUser.apellidos = createUserDto.apellidos;
    newUser.correo = createUserDto.correo;
    newUser.direccion = createUserDto.direccion;
    newUser.numero_direccion = createUserDto.numero_direccion;
    newUser.numTel = createUserDto.numTel;
    newUser.fecha_Creacion = format(new Date(), 'dd/MM/yyyy');
    return newUser;
  }
  
  //! FIND NAME AND LAST NAME
  async findOneByName(nombres: string): Promise<Auth> {
    return await this.findOneByField('nombres', nombres);
  }

  async findOneByLastName(apellidos: string): Promise<Auth | null> {
    return await this.findOneByField('apellidos', apellidos);
  }

  async findOneByField(field: 'nombres' | 'apellidos', value: string): Promise<Auth> {
    try {
      const condition = { [field]: value };
      const user = await this.authRepository.findOne({ where: condition });
      if (!user) {
        throw new NotFoundException(`Usuario con el ${field === 'nombres' ? 'nombre' : 'apellido'} especificado no encontrado`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar usuario por ${field === 'nombres' ? 'nombre' : 'apellido'}: ${error.message}`);
    }
  }


  //! FIND ALL
  async findAll(): Promise<Auth[]> {
    try {
      return await this.authRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuarios');
    }
  }

  //! FIND ID
  async findOneById(id: string): Promise<Auth> {
    try {
      const user = await this.authRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuario por ID');
    }
  }


  //! UPDATE

  //const existingUser = await this.findOneById(id);
  //this.assignUpdateDtoToUser(existingUser, updateAuthDto);
  //return await this.authRepository.save(existingUser);

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<string> {
    try {
      const existingUser = await this.findOneById(id);
      const updatedUser = this.assignUpdateDtoToUser(existingUser, updateAuthDto);

      if (Object.values(updatedUser).every(value => value === null || value === '')) {
        throw new InternalServerErrorException('No se ha actualizado nada');
      }

      await this.authRepository.save(updatedUser);
      return 'Usuario actualizado exitosamente';
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar usuario');
    }
  }

  private assignUpdateDtoToUser(user: Auth, updateAuthDto: UpdateAuthDto): Auth {
    const { nombres, apellidos, correo, direccion, numero_direccion, numTel } = updateAuthDto;
    user.nombres = nombres;
    user.apellidos = apellidos;
    user.correo = correo;
    user.direccion = direccion;
    user.numero_direccion = numero_direccion;
    user.numTel = numTel;
    return user;
  }



  //! REMOVE
  async remove(id: string) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.authRepository.delete(id);
  }
}
