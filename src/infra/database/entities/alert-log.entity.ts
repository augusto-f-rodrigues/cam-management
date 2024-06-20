import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Camera } from './camera.entity';

@Entity('alert_logs')
export class AlertLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'occurred_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  occurredAt: Date;

  @ManyToOne(() => Camera, (camera) => camera.alertLogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'camera_id' })
  camera?: Camera;

  @Column({ name: 'camera_id', type: 'uuid' })
  cameraId: string;
}
