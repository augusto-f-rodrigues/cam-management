import { IsOptional, IsString } from 'class-validator';
import { IsIpFormat } from '@/application/decorators/ip.decorator';

export class UpdateCameraDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsIpFormat()
  @IsOptional()
  ip: string;
}
