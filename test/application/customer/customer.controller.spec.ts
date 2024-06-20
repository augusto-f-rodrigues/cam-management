import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../../../src/application/customer/customer.controller';
import { customerMock, customerServiceMock } from './customer-mock-data';
import { CustomerService } from '@/application/customer/customer.service';

describe('CustomerController Tests', () => {
  let customerController: CustomerController;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: customerServiceMock,
        },
      ],
    }).compile();

    customerController = moduleRef.get<CustomerController>(CustomerController);
  });

  it('Should be defined', () => {
    expect(customerController).toBeDefined();
  });

  it('Should get all customers', async () => {
    const customers = await customerController.findAll();
    expect(customers).toBe(customerMock);
  });

  it('Should get one customer by ID', async () => {
    const customer = await customerController.findOne(
      'a598ae4b-824d-4377-b043-60cb31d5ac58',
    );
    expect(customer).toBe(customerMock[0]);
  });

  it('Should create a new customer', async () => {
    const newCustomerData = { name: 'New Customer' };
    const newCustomer = await customerController.create(newCustomerData);
    expect(newCustomer).toBe(customerMock[1]);
  });

  it('Should update a customer by ID', async () => {
    const updatedCustomerData = { name: 'Updated Customer' };
    const updatedCustomer = await customerController.update(
      'a598ae4b-824d-4377-b043-60cb31d5ac58',
      updatedCustomerData,
    );
    expect(updatedCustomer).toBe(customerMock[2]);
  });

  it('Should remove a customer by ID', async () => {
    const result = await customerController.remove(
      'a598ae4b-824d-4377-b043-60cb31d5ac58',
    );
    expect(result).toBeUndefined();
    expect(customerServiceMock.remove).toHaveBeenCalledWith(
      'a598ae4b-824d-4377-b043-60cb31d5ac58',
    );
  });
});
