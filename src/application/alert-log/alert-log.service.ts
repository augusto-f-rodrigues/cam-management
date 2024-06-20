import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertLog } from '@/infra/database/entities/alert-log.entity';
import { Repository } from 'typeorm';
import { CreateAlertLogDto } from './dto/create-alert-log.dto';

@Injectable()
export class AlertLogService {
  constructor(
    @InjectRepository(AlertLog)
    private readonly alertLogRepository: Repository<AlertLog>,
  ) {}

  async findAll(
    customerId?: string,
    startDate?: string,
    endDate?: string,
  ): Promise<AlertLog[]> {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      throw new ConflictException('End date cannot be earlier than start date');
    }

    const queryBuilder = this.alertLogRepository
      .createQueryBuilder('alertLog')
      .leftJoin('alertLog.camera', 'camera')
      .leftJoin('camera.customer', 'customer');

    if (customerId) {
      queryBuilder.andWhere('customer.id = :customerId', { customerId });
    }

    if (startDate) {
      queryBuilder.andWhere('alertLog.occurredAt >= :startDate', { startDate });
    }

    if (endDate) {
      queryBuilder.andWhere('alertLog.occurredAt <= :endDate', { endDate });
    }

    if (!startDate && !endDate) {
      const today = new Date().toISOString().split('T')[0];
      queryBuilder.andWhere('alertLog.occurredAt = :today', {
        today: `${today}T00:00:00.000Z`,
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<AlertLog> {
    return this.alertLogRepository.findOne({ where: { id } });
  }

  async create(alertLogData: CreateAlertLogDto): Promise<AlertLog> {
    const alertLog = this.alertLogRepository.create(alertLogData);
    return this.alertLogRepository.save(alertLog);
  }

  async update(id: string, alertLogData: CreateAlertLogDto): Promise<AlertLog> {
    await this.alertLogRepository.update(id, alertLogData);
    return this.alertLogRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.alertLogRepository.delete(id);
  }
}
