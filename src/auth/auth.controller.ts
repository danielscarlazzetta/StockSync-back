import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //! CREATE
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  //! FIND
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string){
    return this.authService.findOneById(id);
  }
  
  @Get('nombre/:nombres')
  async findOneByName(@Param('nombres') nombres: string) {
    return this.authService.findOneByName(nombres);
  }
  
  @Get('apellido/:apellidos')
  async findOneByLastName(@Param('apellidos') apellidos: string) {
    return this.authService.findOneByLastName(apellidos);
  }
  

  //! UPDATE
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  //! REMOVE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
