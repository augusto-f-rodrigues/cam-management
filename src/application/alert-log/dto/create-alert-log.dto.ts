import { IsISO8601 } from 'class-validator';

export class CreateAlertLog {
  @IsISO8601()
  occurredAt: Date;
}
