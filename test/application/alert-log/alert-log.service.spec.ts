import { AlertLogService } from '@/application/alert-log/alert-log.service';
import { CreateAlertLogDto } from '@/application/alert-log/dto/create-alert-log.dto';
import { AlertLog } from '@/infra/database/entities/alert-log.entity';
import { ConflictException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  alertLogEntityMock,
  alertLogMock,
  alertLogQueryBuilderMock,
} from './alert-log-mock-data';
import { UpdateAlertLogDto } from '@/application/alert-log/dto/update-alert-log.dto';

describe('AlertLogService', () => {
  let alertLogService: AlertLogService;
  let repo: Repository<AlertLog>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AlertLogService,
        {
          provide: getRepositoryToken(AlertLog),
          useValue: alertLogEntityMock,
        },
      ],
    }).compile();

    alertLogService = moduleRef.get<AlertLogService>(AlertLogService);
    repo = moduleRef.get<Repository<AlertLog>>(getRepositoryToken(AlertLog));
  });

  it('Should be defined', () => {
    expect(alertLogService).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an array of alert logs', async () => {
      const result = await alertLogService.findAll();
      expect(result).toEqual(alertLogMock);
      expect(alertLogQueryBuilderMock.getMany).toHaveBeenCalled();
    });

    it('Should filter by customerId', async () => {
      const customerId = 'a598ae4b-824d-4377-b043-60cb31d5ac58';
      const result = await alertLogService.findAll(customerId);
      expect(result).toEqual(alertLogMock);
      expect(repo.createQueryBuilder().andWhere).toHaveBeenCalledWith(
        'customer.id = :customerId',
        { customerId },
      );
    });

    it('Should filter by startDate and endDate', async () => {
      const startDate = '2024-06-16';
      const endDate = '2024-06-18';
      const result = await alertLogService.findAll(
        undefined,
        startDate,
        endDate,
      );
      expect(result).toEqual(alertLogMock);
      expect(repo.createQueryBuilder().andWhere).toHaveBeenCalledWith(
        'alertLog.occurredAt >= :startDate',
        { startDate },
      );
      expect(repo.createQueryBuilder().andWhere).toHaveBeenCalledWith(
        'alertLog.occurredAt <= :endDate',
        { endDate },
      );
    });

    it('Should throw ConflictException if endDate is earlier than startDate', async () => {
      const startDate = '2024-06-18';
      const endDate = '2024-06-16';
      await expect(
        alertLogService.findAll(undefined, startDate, endDate),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('Should return a single alert log', async () => {
      const result = await alertLogService.findOne(
        'c6165067-c5b0-4eed-af94-02c7528a1e8e',
      );
      expect(result).toEqual(alertLogMock[0]);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: 'c6165067-c5b0-4eed-af94-02c7528a1e8e' },
      });
    });
  });

  describe('create', () => {
    it('Should create and return a new alert log', async () => {
      const createAlertLogDto: CreateAlertLogDto = {
        occurredAt: new Date('2024-06-18'),
        cameraId: 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
      };
      const result = await alertLogService.create(createAlertLogDto);
      expect(result).toEqual(alertLogMock[1]);
      expect(repo.create).toHaveBeenCalledWith(createAlertLogDto);
      expect(repo.save).toHaveBeenCalledWith(alertLogMock[1]);
    });
  });

  describe('update', () => {
    it('Should update and return an existing alert log', async () => {
      const updateAlertLogDto: UpdateAlertLogDto = {
        occurredAt: new Date('2024-06-20'),
      };
      const result = await alertLogService.update(
        '214d2aea-e3e0-4bbc-8359-e2dc3ceb99b7',
        updateAlertLogDto,
      );
      expect(result).toEqual(alertLogMock[0]);
      expect(repo.update).toHaveBeenCalledWith(
        '214d2aea-e3e0-4bbc-8359-e2dc3ceb99b7',
        updateAlertLogDto,
      );
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: '214d2aea-e3e0-4bbc-8359-e2dc3ceb99b7' },
      });
    });
  });

  describe('remove', () => {
    it('Should remove an alert log', async () => {
      await expect(
        alertLogService.remove('214d2aea-e3e0-4bbc-8359-e2dc3ceb99b7'),
      ).resolves.toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith(
        '214d2aea-e3e0-4bbc-8359-e2dc3ceb99b7',
      );
    });
  });
});
