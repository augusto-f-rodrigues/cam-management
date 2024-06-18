import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from 'src/infra/database/entities/customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Post()
  async create(@Body() customerData: Partial<Customer>): Promise<Customer> {
    return this.customerService.create(customerData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() customerData: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerService.update(id, customerData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.customerService.remove(id);
  }
}
