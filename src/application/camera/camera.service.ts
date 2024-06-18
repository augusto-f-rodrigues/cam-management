import { Injectable } from '@nestjs/common';
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

  async create(cameraData: Partial<Camera>, userId: string): Promise<Camera> {
    const user = await this.customerRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const camera = this.cameraRepository.create({
      ...cameraData,
      customer: user,
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
}
