import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class GetCameraDto {
  @IsOptional()
  @IsBooleanString()
  isEnabled?: boolean;

  @IsOptional()
  @IsString()
  customerId?: string;
}
