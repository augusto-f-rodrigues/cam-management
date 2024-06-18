import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/infra/database/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    return this.customerRepository.findOne({ where: { id: id } });
  }

  async create(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepository.create(customerData);
    return this.customerRepository.save(customer);
  }

  async update(id: string, customerData: Partial<Customer>): Promise<Customer> {
    await this.customerRepository.update(id, customerData);
    return this.customerRepository.findOne({ where: { id: id } });
  }

  async remove(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
