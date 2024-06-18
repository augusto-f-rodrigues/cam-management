import { Body, Controller, Post } from '@nestjs/common';
import { Customer } from 'src/infra/database/entities/customer.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async auth(@Body() payload: Partial<Customer>): Promise<{ token: string }> {
    const authUser = await this.authService.authUser(payload.name);
    const token = await this.authService.generateToken(authUser);
    return { token };
  }
}
