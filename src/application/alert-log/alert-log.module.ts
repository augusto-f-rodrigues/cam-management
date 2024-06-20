import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertLogController } from './alert-log.controller';
import { AlertLogService } from './alert-log.service';
import { Module } from '@nestjs/common';
import { AlertLog } from '@/infra/database/entities/alert-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlertLog])],
  controllers: [AlertLogController],
  providers: [AlertLogService],
})
export class AlertLogModule {}
