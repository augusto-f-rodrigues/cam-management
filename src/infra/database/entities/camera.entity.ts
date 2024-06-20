import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { AlertLog } from './alert-log.entity';
import { IsIpFormat } from '@/application/decorators/ip.decorator';

@Entity('cameras')
export class Camera {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 126 })
  name: string;

  @Column({ length: 126 })
  @IsIpFormat({
    message: 'IP address must be in the format of 0.0.0.0 to 255.255.255.255',
  })
  ip: string;

  @Column({ name: 'is_enabled', default: true })
  isEnabled: boolean;

  @ManyToOne(() => Customer, (customer) => customer.cameras, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer?: Customer;

  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @OneToMany(() => AlertLog, (alertLog) => alertLog.camera, {
    onDelete: 'CASCADE',
  })
  alertLogs?: AlertLog[];
}
