import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  nombres: string;

  @Column({ length: 50 })
  apellidos: string;

  @Column({ unique: true, length: 80 })
  correo: string;

  @Column({ length: 80 })
  direccion: string;

  @Column({ type: 'bigint', nullable: false })
  numero_direccion: number;

  @Column({ length: 20 })
  numTel: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_Creacion: Date;
}