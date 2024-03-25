import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from './shared/database-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './component/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig), // Configura TypeORM con la configuración
    AuthModule, ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
