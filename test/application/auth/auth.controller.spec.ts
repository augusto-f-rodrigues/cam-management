import { AuthController } from '@/application/auth/auth.controller';
import { AuthService } from '@/application/auth/auth.service';
import { Test } from '@nestjs/testing';
import { authServiceMock } from './auth-mock-data';
import { customerMock } from '../customer/customer-mock-data';

describe('AuthController Test', () => {
  let authControllerMock: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    authControllerMock = moduleRef.get<AuthController>(AuthController);
  });

  it('Should be defined', () => {
    expect(authControllerMock).toBeDefined();
  });

  it('Should return token for valid customer', async () => {
    const result = await authControllerMock.auth(customerMock[0]);

    expect(result).toEqual({ token: 'valid-token' });
  });
});
