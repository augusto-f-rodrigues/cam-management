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
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { AlertLogService } from './alert-log.service';
import { AlertLog } from 'src/infra/database/entities/alert-log.entity';

@Controller('alert-log')
@UseGuards(JwtAuthGuard)
export class AlertLogController {
  constructor(private readonly alertLogService: AlertLogService) {}

  @Get()
  async findAll(): Promise<AlertLog[]> {
    return this.alertLogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AlertLog> {
    return this.alertLogService.findOne(id);
  }

  @Post()
  async create(@Body() alertLogData: Partial<AlertLog>): Promise<AlertLog> {
    return this.alertLogService.create(alertLogData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() alertLogData: Partial<AlertLog>,
  ): Promise<AlertLog> {
    return this.alertLogService.update(id, alertLogData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.alertLogService.remove(id);
  }
}
