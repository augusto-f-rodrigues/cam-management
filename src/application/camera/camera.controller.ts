import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
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

  @Get('customer/:id')
  async findByCustomerId(@Param('id') id: string): Promise<Camera[]> {
    return this.cameraService.findByCustomerId(id);
  }

  @Post()
  async create(
    @Body() cameraData: Partial<Camera>,
    @Request() req,
  ): Promise<Camera> {
    const customerId = req.customer.id;
    return this.cameraService.create(cameraData, customerId);
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

  @Patch(':id/disable')
  async disable(@Param('id') id: string): Promise<Camera> {
    return this.cameraService.disable(id);
  }
}
