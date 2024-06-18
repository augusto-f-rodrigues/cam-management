import { TypeOrmModule } from '@nestjs/typeorm';
import { CameraController } from './camera.controller';
import { CameraService } from './camera.service';
import { Module } from '@nestjs/common';
import { Camera } from 'src/infra/database/entities/camera.entity';
import { Customer } from 'src/infra/database/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Camera, Customer])],
  controllers: [CameraController],
  providers: [CameraService],
})
export class CameraModule {}
