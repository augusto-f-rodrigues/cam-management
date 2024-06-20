export const cameraMock = [
  {
    id: 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
    name: 'camera-augusto-01',
    ip: '0.0.0.0',
    isEnabled: true,
    customerId: 'a598ae4b-824d-4377-b043-60cb31d5ac58',
  },
  {
    id: '6b00e451-bdc7-4ba3-8e79-0fd2921b6aa7',
    name: 'camera-augusto-02',
    ip: '255.255.255.255',
    isEnabled: false,
    customerId: 'a598ae4b-824d-4377-b043-60cb31d5ac58',
  },
  {
    id: '41c1e0ad-b045-4100-aa32-1946a2673411',
    name: 'camera-murilo-01',
    ip: '0.0.0.0',
    isEnabled: true,
    customerId: '8f7101c3-6ba0-4225-ab85-377470b618a4',
  },
  {
    id: '4afcb811-c890-4039-9958-db1157bb4b56',
    name: 'camera-mediotti-01',
    ip: '0.0.0.0',
    isEnabled: true,
    customerId: '78c4490e-5bca-4b70-b7ef-fc1152c386c7',
  },
];

export const cameraMockService = {
  findAll: jest.fn().mockResolvedValue(cameraMock),
  findOne: jest.fn().mockResolvedValue(cameraMock[0]),
  findByCustomerId: jest.fn().mockResolvedValue(cameraMock.slice(0, 2)),
  create: jest.fn().mockResolvedValue(cameraMock[2]),
  update: jest.fn().mockResolvedValue(cameraMock[2]),
  remove: jest.fn().mockResolvedValue(undefined),
  disable: jest.fn().mockResolvedValue(cameraMock[1]),
  enable: jest.fn().mockResolvedValue(cameraMock[3]),
};
