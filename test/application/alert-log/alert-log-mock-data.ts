export const alertLogMock = [
  {
    id: 'c6165067-c5b0-4eed-af94-02c7528a1e8e',
    occurredAt: '2024-06-16',
    cameraId: 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
  },
  {
    id: 'd2c4aa08-daf8-4933-9d8d-bd170fb78d41',
    occurredAt: '2024-06-18',
    cameraId: 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
  },
  {
    id: '214d2aea-e3e0-4bbc-8359-e2dc3ceb99b7',
    occurredAt: '2024-06-20',
    cameraId: 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
  },
];

export const alertLogServiceMock = {
  findAll: jest.fn().mockResolvedValue(alertLogMock),
  findOne: jest.fn().mockResolvedValue(alertLogMock[0]),
  create: jest.fn().mockResolvedValue(alertLogMock[1]),
  update: jest.fn().mockResolvedValue(alertLogMock[2]),
  remove: jest.fn().mockResolvedValue(undefined),
};
