import { CameraService } from '@/application/camera/camera.service';
import { Camera } from '@/infra/database/entities/camera.entity';
import { Customer } from '@/infra/database/entities/customer.entity';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  customerEntityMock,
  customerMock,
} from '../customer/customer-mock-data';
import {
  cameraEntityMock,
  cameraMock,
  cameraQueryBuilderMock,
  newCamera,
} from './camera-mock-data';

describe('CameraService', () => {
  let cameraService: CameraService;
  let cameraRepo: Repository<Camera>;
  let customerRepo: Repository<Customer>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CameraService,
        {
          provide: getRepositoryToken(Camera),
          useValue: cameraEntityMock,
        },
        {
          provide: getRepositoryToken(Customer),
          useValue: customerEntityMock,
        },
      ],
    }).compile();

    cameraService = moduleRef.get<CameraService>(CameraService);
    cameraRepo = moduleRef.get<Repository<Camera>>(getRepositoryToken(Camera));
    customerRepo = moduleRef.get<Repository<Customer>>(
      getRepositoryToken(Customer),
    );
  });

  it('Should be defined', () => {
    expect(cameraService).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an array of cameras', async () => {
      const result = await cameraService.findAll();
      expect(result).toEqual(cameraMock);
      expect(cameraQueryBuilderMock.getMany).toHaveBeenCalled();
    });

    it('Should return an array of cameras filtered by customerId and isEnabled', async () => {
      const result = await cameraService.findAll(
        'a598ae4b-824d-4377-b043-60cb31d5ac58',
        true,
      );
      expect(result).toEqual(cameraMock);
      expect(cameraQueryBuilderMock.leftJoin).toHaveBeenCalled();
      expect(cameraQueryBuilderMock.andWhere).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Should return a single camera', async () => {
      const result = await cameraService.findOne(
        'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
      );
      expect(result).toEqual(cameraMock[0]);
      expect(cameraRepo.findOne).toHaveBeenCalledWith({
        where: { id: 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3' },
      });
    });
  });

  describe('findByCustomerId', () => {
    it('Should return an array of cameras for a given customer', async () => {
      jest
        .spyOn(cameraRepo, 'find')
        .mockResolvedValueOnce(cameraMock.slice(0, 2));
      const result = await cameraService.findByCustomerId(
        'a598ae4b-824d-4377-b043-60cb31d5ac58',
      );
      expect(result).toEqual(cameraMock.slice(0, 2));
      expect(cameraRepo.find).toHaveBeenCalledWith({
        where: { customer: { id: 'a598ae4b-824d-4377-b043-60cb31d5ac58' } },
      });
    });
  });

  describe('create', () => {
    it('Should create and return a new camera', async () => {
      jest.spyOn(cameraRepo, 'findOne').mockResolvedValueOnce(null);
      const createCameraDto = {
        name: 'new camera',
        ip: '192.168.0.1',
        isEnabled: true,
      };
      const result = await cameraService.create(
        createCameraDto,
        'a598ae4b-824d-4377-b043-60cb31d5ac58',
      );
      expect(result).toEqual(newCamera);
      expect(cameraRepo.create).toHaveBeenCalledWith({
        ...createCameraDto,
        customer: customerMock[0],
      });
      expect(cameraRepo.save).toHaveBeenCalledWith(newCamera);
    });

    it('Should throw ConflictException if customer is not found', async () => {
      jest.spyOn(customerRepo, 'findOne').mockResolvedValueOnce(null);
      const createCameraDto = {
        name: 'new camera',
        ip: '192.168.0.1',
        isEnabled: true,
      };

      await expect(
        cameraService.create(createCameraDto, 'invalid-customer-id'),
      ).rejects.toThrow(ConflictException);
    });

    it('Should throw ConflictException if camera with the same IP already exists', async () => {
      jest.spyOn(cameraRepo, 'findOne').mockResolvedValueOnce(cameraMock[0]);
      const createCameraDto = {
        name: 'new camera',
        ip: '0.0.0.0',
        isEnabled: true,
      };

      await expect(
        cameraService.create(
          createCameraDto,
          'a598ae4b-824d-4377-b043-60cb31d5ac58',
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('Should update and return an existing camera', async () => {
      const updateCameraDto = { name: 'updated camera' };
      const result = await cameraService.update(
        '41c1e0ad-b045-4100-aa32-1946a2673411',
        updateCameraDto,
      );
      expect(result).toEqual(cameraMock[2]);
      expect(cameraRepo.update).toHaveBeenCalledWith(
        '41c1e0ad-b045-4100-aa32-1946a2673411',
        updateCameraDto,
      );
      expect(cameraRepo.findOne).toHaveBeenCalledWith({
        where: { id: '41c1e0ad-b045-4100-aa32-1946a2673411' },
      });
    });
  });

  describe('remove', () => {
    it('Should remove a camera', async () => {
      await expect(
        cameraService.remove('41c1e0ad-b045-4100-aa32-1946a2673411'),
      ).resolves.toBeUndefined();
      expect(cameraRepo.delete).toHaveBeenCalledWith(
        '41c1e0ad-b045-4100-aa32-1946a2673411',
      );
    });
  });

  describe('disable', () => {
    it('Should disable a camera', async () => {
      const result = await cameraService.disable(
        '6b00e451-bdc7-4ba3-8e79-0fd2921b6aa7',
      );
      expect(result).toEqual(cameraMock[1]);
      expect(cameraRepo.findOne).toHaveBeenCalledWith({
        where: { id: '6b00e451-bdc7-4ba3-8e79-0fd2921b6aa7' },
      });
      expect(cameraRepo.save).toHaveBeenCalledWith(cameraMock[1]);
    });

    it('Should throw an error if camera not found', async () => {
      jest.spyOn(cameraRepo, 'findOne').mockResolvedValueOnce(null);
      await expect(cameraService.disable('invalid-id')).rejects.toThrow(
        'Camera not found',
      );
    });
  });

  describe('enable', () => {
    it('Should enable a camera', async () => {
      const result = await cameraService.enable(
        '4afcb811-c890-4039-9958-db1157bb4b56',
      );
      expect(result).toEqual(cameraMock[3]);
      expect(cameraRepo.findOne).toHaveBeenCalledWith({
        where: { id: '4afcb811-c890-4039-9958-db1157bb4b56' },
      });
      expect(cameraRepo.save).toHaveBeenCalledWith(cameraMock[3]);
    });

    it('Should throw an error if camera not found', async () => {
      jest.spyOn(cameraRepo, 'findOne').mockResolvedValueOnce(null);
      await expect(cameraService.enable('invalid-id')).rejects.toThrow(
        'Camera not found',
      );
    });
  });
});
