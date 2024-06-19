import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertLog } from 'src/infra/database/entities/alert-log.entity';
import { Between, Repository } from 'typeorm';
import { CreateAlertLog } from './dto/create-alert-log.dto';

@Injectable()
export class AlertLogService {
  constructor(
    @InjectRepository(AlertLog)
    private readonly alertLogRepository: Repository<AlertLog>,
  ) {}

  async findAll(): Promise<AlertLog[]> {
    return this.alertLogRepository.find();
  }

  async findOne(id: string): Promise<AlertLog> {
    return this.alertLogRepository.findOne({ where: { id } });
  }

  async create(alertLogData: CreateAlertLog): Promise<AlertLog> {
    const alertLog = this.alertLogRepository.create(alertLogData);
    return this.alertLogRepository.save(alertLog);
  }

  async update(id: string, alertLogData: CreateAlertLog): Promise<AlertLog> {
    await this.alertLogRepository.update(id, alertLogData);
    return this.alertLogRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.alertLogRepository.delete(id);
  }

  async findByTimeInterval(
    startTime: Date,
    endTime: Date,
  ): Promise<AlertLog[]> {
    return this.alertLogRepository.find({
      where: {
        occurredAt: Between(startTime, endTime),
      },
    });
  }
}
