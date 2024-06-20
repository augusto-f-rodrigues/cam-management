/* istanbul ignore file */
import { IsOptional, IsString, IsISO8601 } from 'class-validator';

export class GetAlertLogsDto {
  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @IsOptional()
  @IsISO8601()
  endDate?: string;
}
