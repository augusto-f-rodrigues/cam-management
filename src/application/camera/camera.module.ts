import { CameraController } from './camera.controller';
import { CameraService } from './camera.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CameraController],
  providers: [CameraService],
})
export class CameraModule {}
