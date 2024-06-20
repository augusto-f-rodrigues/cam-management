import { Body, Controller, Post } from '@nestjs/common';
import { Customer } from '@/infra/database/entities/customer.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async auth(@Body() payload: Partial<Customer>): Promise<{ token: string }> {
    const authCustomer = await this.authService.authCustomer(payload.name);
    const token = await this.authService.generateToken(authCustomer);
    return { token };
  }
}
