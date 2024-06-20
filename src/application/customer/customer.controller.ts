import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Customer } from '@/infra/database/entities/customer.entity';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-camera.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Post()
  async create(@Body() customerData: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(customerData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() customerData: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.update(id, customerData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.customerService.remove(id);
  }
}
