import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Camera } from 'src/infra/database/entities/camera.entity';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { CameraService } from './camera.service';

@Controller('camera')
@UseGuards(JwtAuthGuard)
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Get()
  async findAll(): Promise<Camera[]> {
    return this.cameraService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Camera> {
    return this.cameraService.findOne(id);
  }

  @Post()
  async create(@Body() cameraData: Partial<Camera>): Promise<Camera> {
    return this.cameraService.create(cameraData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() cameraData: Partial<Camera>,
  ): Promise<Camera> {
    return this.cameraService.update(id, cameraData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.cameraService.remove(id);
  }
}
