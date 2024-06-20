import { Test, TestingModule } from '@nestjs/testing';
import { AlertLogController } from '@/application/alert-log/alert-log.controller';
import { AlertLogService } from '@/application/alert-log/alert-log.service';
import { alertLogMock, alertLogServiceMock } from './alert-log-mock-data';

describe('AlertLogController', () => {
  let alertLogController: AlertLogController;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AlertLogController],
      providers: [
        {
          provide: AlertLogService,
          useValue: alertLogServiceMock,
        },
      ],
    }).compile();

    alertLogController = moduleRef.get<AlertLogController>(AlertLogController);
  });

  it('should be defined', () => {
    expect(alertLogController).toBeDefined();
  });

  it('should get all alert logs', async () => {
    const query = {
      customerId: 'some-customer-id',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
    };
    const result = await alertLogController.findAll(query);
    expect(result).toEqual(alertLogMock);
  });

  it('should get one alert log by ID', async () => {
    const result = await alertLogController.findOne(
      'c6165067-c5b0-4eed-af94-02c7528a1e8e',
    );
    expect(result).toEqual(alertLogMock[0]);
  });

  it('should create a new alert log', async () => {
    const newAlertLogData = {
      occurredAt: new Date(),
      cameraId: 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
    };
    const result = await alertLogController.create(newAlertLogData);
    expect(result).toEqual(alertLogMock[1]);
  });

  it('should update an alert log by ID', async () => {
    const updateAlertLogData = {
      occurredAt: new Date(),
      cameraId: 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
    };
    const result = await alertLogController.update(
      'd2c4aa08-daf8-4933-9d8d-bd170fb78d41',
      updateAlertLogData,
    );
    expect(result).toEqual(alertLogMock[2]);
  });

  it('should remove an alert log by ID', async () => {
    const result = await alertLogController.remove(
      '214d2aea-e3e0-4bbc-8359-e2dc3ceb99b7',
    );
    expect(result).toBeUndefined();
    expect(alertLogServiceMock.remove).toHaveBeenCalledWith(
      '214d2aea-e3e0-4bbc-8359-e2dc3ceb99b7',
    );
  });
});
