import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Camera } from './camera.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 126 })
  name: string;

  @OneToMany(() => Camera, (camera) => camera.customer)
  cameras: Camera[];
}
