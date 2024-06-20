import { customerMock } from '../customer/customer-mock-data';

export const authServiceMock = {
  authCustomer: jest.fn().mockReturnValue(customerMock[0]),
  generateToken: jest.fn().mockResolvedValue('valid-token'),
};
