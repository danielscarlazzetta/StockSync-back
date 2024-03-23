import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository, FindOneOptions  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';

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
    return newUser;
  }

  //! FIND


  // async findOneByName2(nombres: string): Promise<Auth> {
  //   try {
  //     const user = await this.authRepository.findOne({ where: { nombres } });
  //     if (!user) {
  //       throw new NotFoundException('Usuario con el nombre especificado no encontrado');
  //     }
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException('Error al buscar usuario por nombre: ' + error.message);
  //   }
  // }

  // async findOneByLastName2(apellidos: string): Promise<Auth | null> {
  //   try {
  //     const user = await this.authRepository.findOne({ where: { apellidos } });
  //     if (!user) {
  //       throw new NotFoundException('Usuario con el apellido especificado no encontrado');
  //     }
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException('Error al buscar usuario por apellido: ' + error.message);
  //   }
  // }
  

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
  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<Auth> {
    try {
      const existingUser = await this.findOneById(id);
      // Aquí puedes agregar las validaciones necesarias utilizando el DTO de actualización
      existingUser.nombres = updateAuthDto.nombres;
      existingUser.apellidos = updateAuthDto.apellidos;
      existingUser.correo = updateAuthDto.correo;
      existingUser.direccion = updateAuthDto.direccion;
      existingUser.numero_direccion = updateAuthDto.numero_direccion;
      existingUser.numTel = updateAuthDto.numTel;

      return await this.authRepository.save(existingUser);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar usuario');
    }
  }


  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
