import { IsString } from 'class-validator';
import { IsIpFormat } from 'src/application/decorators/ip.decorator';

export class CreateCameraDto {
  @IsString()
  name: string;

  @IsString()
  @IsIpFormat()
  ip: string;
}
