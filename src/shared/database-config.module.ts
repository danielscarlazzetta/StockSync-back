import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'pass',
  database: 'stocksync',
  entities: [Auth],
  synchronize: true,
};