/* istanbul ignore file */
import { IsISO8601, IsString } from 'class-validator';

export class CreateAlertLogDto {
  @IsISO8601()
  occurredAt: Date;

  @IsString()
  cameraId: string;
}
