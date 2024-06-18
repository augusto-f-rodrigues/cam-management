import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from 'src/infra/database/entities/camera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CameraService {
  constructor(
    @InjectRepository(Camera)
    private readonly cameraRepository: Repository<Camera>,
  ) {}

  async findAll(): Promise<Camera[]> {
    return this.cameraRepository.find();
  }

  async findOne(id: string): Promise<Camera> {
    return this.cameraRepository.findOne({ where: { id } });
  }

  async create(cameraData: Partial<Camera>): Promise<Camera> {
    const camera = this.cameraRepository.create(cameraData);
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