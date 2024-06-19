import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Camera } from 'src/infra/database/entities/camera.entity';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dto/create-camera.dto';

@Controller('camera')
@UseGuards(JwtAuthGuard)
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Get()
  async findAll(@Query('isEnabled') isEnabled: boolean): Promise<Camera[]> {
    return this.cameraService.findAll(isEnabled);
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
    @Body() cameraData: CreateCameraDto,
    @Request() req,
  ): Promise<Camera> {
    const customerId = req.customer.id;
    return this.cameraService.create(cameraData, customerId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() cameraData: CreateCameraDto,
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
