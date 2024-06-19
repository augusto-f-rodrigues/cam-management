import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from 'src/infra/database/entities/camera.entity';
import { Customer } from 'src/infra/database/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CameraService {
  constructor(
    @InjectRepository(Camera)
    private readonly cameraRepository: Repository<Camera>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Camera[]> {
    return this.cameraRepository.find();
  }

  async findOne(id: string): Promise<Camera> {
    return this.cameraRepository.findOne({ where: { id } });
  }

  async findByCustomerId(customerId: string): Promise<Camera[]> {
    return this.cameraRepository.find({
      where: { customer: { id: customerId } },
    });
  }

  async create(
    cameraData: Partial<Camera>,
    customerId: string,
  ): Promise<Camera> {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new ConflictException('Customer not found');
    }

    const existingCamera = await this.cameraRepository.findOne({
      where: { ip: cameraData.ip, customerId: cameraData.customerId },
    });

    if (existingCamera) {
      throw new ConflictException(
        'A camera with this IP already exists for this customer.',
      );
    }

    const camera = this.cameraRepository.create({
      ...cameraData,
      customer: customer,
    });
    return this.cameraRepository.save(camera);
  }

  async update(id: string, cameraData: Partial<Camera>): Promise<Camera> {
    await this.cameraRepository.update(id, cameraData);
    return this.cameraRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.cameraRepository.delete(id);
  }

  async disable(id: string): Promise<Camera> {
    const camera = await this.cameraRepository.findOne({ where: { id } });
    if (!camera) {
      throw new Error('Camera not found');
    }
    camera.isEnabled = false;
    return this.cameraRepository.save(camera);
  }
}
