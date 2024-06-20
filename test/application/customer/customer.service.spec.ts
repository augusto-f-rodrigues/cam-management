import { CustomerService } from '@/application/customer/customer.service';
import { Customer } from '@/infra/database/entities/customer.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customerEntityMock, customerMock } from './customer-mock-data';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let repo: Repository<Customer>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: customerEntityMock,
        },
      ],
    }).compile();

    customerService = moduleRef.get<CustomerService>(CustomerService);
    repo = moduleRef.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('Should be defined', () => {
    expect(customerService).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an array of customers', () => {
      const repoSpy = jest.spyOn(repo, 'find');
      expect(customerService.findAll()).resolves.toEqual(customerMock);
      expect(repoSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Should return a single customer', async () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      await expect(
        customerService.findOne('a598ae4b-824d-4377-b043-60cb31d5ac58'),
      ).resolves.toEqual(customerMock[0]);
      expect(repoSpy).toHaveBeenCalledWith({
        where: { id: 'a598ae4b-824d-4377-b043-60cb31d5ac58' },
      });
    });
  });

  describe('create', () => {
    it('Should create a new customer', async () => {
      const repoCreateSpy = jest.spyOn(repo, 'create');
      const repoSaveSpy = jest.spyOn(repo, 'save');
      await expect(customerService.create(customerMock[1])).resolves.toEqual(
        customerMock[1],
      );
      expect(repoCreateSpy).toHaveBeenCalledWith(customerMock[1]);
      expect(repoSaveSpy).toHaveBeenCalledWith(customerMock[1]);
    });
  });

  describe('update', () => {
    it('Should update an existing customer', async () => {
      const repoUpdateSpy = jest.spyOn(repo, 'update');
      const repoFindOneSpy = jest.spyOn(repo, 'findOne');
      await expect(
        customerService.update(
          'a598ae4b-824d-4377-b043-60cb31d5ac58',
          customerMock[2],
        ),
      ).resolves.toEqual(customerMock[0]);
      expect(repoUpdateSpy).toHaveBeenCalledWith(
        'a598ae4b-824d-4377-b043-60cb31d5ac58',
        customerMock[2],
      );
      expect(repoFindOneSpy).toHaveBeenCalledWith({
        where: { id: 'a598ae4b-824d-4377-b043-60cb31d5ac58' },
      });
    });
  });

  describe('remove', () => {
    it('Should remove an existing customer', async () => {
      const repoDeleteSpy = jest.spyOn(repo, 'delete');
      await expect(
        customerService.remove('a598ae4b-824d-4377-b043-60cb31d5ac58'),
      ).resolves.toBeUndefined();
      expect(repoDeleteSpy).toHaveBeenCalledWith(
        'a598ae4b-824d-4377-b043-60cb31d5ac58',
      );
    });
  });
});
