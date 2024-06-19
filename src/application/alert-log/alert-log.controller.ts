import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { AlertLogService } from './alert-log.service';
import { AlertLog } from 'src/infra/database/entities/alert-log.entity';
import { CreateAlertLogDto } from './dto/create-alert-log.dto';
import { GetAlertLogsDto } from './dto/get-alert-log.dto';

@Controller('alert-log')
@UseGuards(JwtAuthGuard)
export class AlertLogController {
  constructor(private readonly alertLogService: AlertLogService) {}

  @Get()
  async findAll(@Query() query: GetAlertLogsDto): Promise<AlertLog[]> {
    const { customerId, startDate, endDate } = query;
    return this.alertLogService.findAll(customerId, startDate, endDate);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AlertLog> {
    return this.alertLogService.findOne(id);
  }

  @Post()
  async create(@Body() alertLogData: CreateAlertLogDto): Promise<AlertLog> {
    return this.alertLogService.create(alertLogData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() alertLogData: CreateAlertLogDto,
  ): Promise<AlertLog> {
    return this.alertLogService.update(id, alertLogData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.alertLogService.remove(id);
  }
}
