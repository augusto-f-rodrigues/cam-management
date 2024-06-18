import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/infra/database/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async authUser(username: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { name: username },
    });
    return customer;
  }

  async generateToken(customer: Customer) {
    const payload = { username: customer.name, sub: customer.id };
    return this.jwtService.sign(payload);
  }
}
