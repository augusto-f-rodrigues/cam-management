import { Test, TestingModule } from '@nestjs/testing';
import { cameraMock, cameraMockService } from './camera-mock-data';
import { CameraController } from '@/application/camera/camera.controller';
import { CameraService } from '@/application/camera/camera.service';

describe('CameraController', () => {
  let cameraController: CameraController;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CameraController],
      providers: [
        {
          provide: CameraService,
          useValue: cameraMockService,
        },
      ],
    }).compile();

    cameraController = moduleRef.get<CameraController>(CameraController);
  });

  it('should be defined', () => {
    expect(cameraController).toBeDefined();
  });

  it('should get all cameras', async () => {
    const result = await cameraController.findAll({});
    expect(result).toEqual(cameraMock);
  });

  it('should get one camera by ID', async () => {
    const result = await cameraController.findOne(
      'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
    );
    expect(result).toEqual(cameraMock[0]);
  });

  it('should get cameras by customer ID', async () => {
    const result = await cameraController.findByCustomerId(
      'a598ae4b-824d-4377-b043-60cb31d5ac58',
    );
    expect(result).toEqual(cameraMock.slice(0, 2));
  });

  it('should create a new camera', async () => {
    const newCameraData = {
      name: 'new-camera',
      ip: '192.168.1.1',
      isEnabled: true,
      customerId: 'a598ae4b-824d-4377-b043-60cb31d5ac58',
    };
    const req = { customer: { id: 'a598ae4b-824d-4377-b043-60cb31d5ac58' } };
    const result = await cameraController.create(newCameraData, req);
    expect(result).toEqual(cameraMock[2]);
  });

  it('should update a camera by ID', async () => {
    const updateCameraData = {
      name: 'updated-camera',
      ip: '192.168.1.2',
      isEnabled: true,
      customerId: 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
    };
    const result = await cameraController.update(
      'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
      updateCameraData,
    );
    expect(result).toEqual(cameraMock[2]);
  });

  it('should remove a camera by ID', async () => {
    const result = await cameraController.remove(
      'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
    );
    expect(result).toBeUndefined();
    expect(cameraMockService.remove).toHaveBeenCalledWith(
      'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
    );
  });

  it('should disable a camera by ID', async () => {
    const result = await cameraController.disable(
      'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
    );
    expect(result).toEqual(cameraMock[1]);
  });

  it('should enable a camera by ID', async () => {
    const result = await cameraController.enable(
      '4afcb811-c890-4039-9958-db1157bb4b56',
    );
    expect(result).toEqual(cameraMock[3]);
  });
});
