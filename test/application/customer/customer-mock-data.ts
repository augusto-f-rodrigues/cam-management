export const customerMock = [
  {
    id: 'a598ae4b-824d-4377-b043-60cb31d5ac58',
    name: 'Augusto F. Rodrigues',
  },
  {
    id: '8f7101c3-6ba0-4225-ab85-377470b618a4',
    name: 'Murilo H. Teixeira',
  },
  {
    id: '78c4490e-5bca-4b70-b7ef-fc1152c386c7',
    name: 'Gabriel Mediotti',
  },
];

export const customerServiceMock = {
  findAll: jest.fn().mockResolvedValue(customerMock),
  findOne: jest.fn().mockResolvedValue(customerMock[0]),
  create: jest.fn().mockResolvedValue(customerMock[1]),
  update: jest.fn().mockResolvedValue(customerMock[2]),
  remove: jest.fn().mockResolvedValue(undefined),
};
