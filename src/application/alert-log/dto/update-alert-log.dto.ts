/* istanbul ignore file */
import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdateAlertLogDto {
  @IsISO8601()
  @IsOptional()
  occurredAt?: Date;

  @IsString()
  @IsOptional()
  cameraId?: string;
}
