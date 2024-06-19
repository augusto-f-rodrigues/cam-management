import { IsISO8601 } from 'class-validator';

export class CreateAlertLogDto {
  @IsISO8601()
  occurredAt: Date;
}
