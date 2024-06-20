import { AuthService } from '@/application/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '@/infra/database/entities/customer.entity';
import { ConflictException } from '@nestjs/common';
import { customerMock } from '../customer/customer-mock-data';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let customerRepo: Repository<Customer>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    customerRepo = moduleRef.get<Repository<Customer>>(
      getRepositoryToken(Customer),
    );
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('authCustomer', () => {
    it('Should return a customer when username is valid', async () => {
      jest
        .spyOn(customerRepo, 'findOne')
        .mockResolvedValueOnce(customerMock[0]);

      const result = await authService.authCustomer('valid_username');
      expect(result).toEqual(customerMock[0]);
      expect(customerRepo.findOne).toHaveBeenCalledWith({
        where: { name: 'valid_username' },
      });
    });

    it('Should throw ConflictException if username is not provided', async () => {
      await expect(authService.authCustomer('')).rejects.toThrow(
        ConflictException,
      );
    });

    it('Should return null if customer is not found', async () => {
      jest.spyOn(customerRepo, 'findOne').mockResolvedValueOnce(null);

      const result = await authService.authCustomer('invalid_username');
      expect(result).toBeNull();
      expect(customerRepo.findOne).toHaveBeenCalledWith({
        where: { name: 'invalid_username' },
      });
    });
  });

  describe('generateToken', () => {
    it('Should generate a valid JWT token for a customer', async () => {
      const customer = customerMock[0];
      const payload = { username: customer.name, sub: customer.id };
      const token = 'mocked_token';

      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.generateToken(customer);
      expect(result).toEqual(token);
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
    });
  });
});
