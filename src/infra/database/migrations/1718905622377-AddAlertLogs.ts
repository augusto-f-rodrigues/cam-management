import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAlertLogs1718905622377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "alert_logs" (id, occurred_at, camera_id) VALUES
      ('c6165067-c5b0-4eed-af94-02c7528a1e8e', '2024-06-16T00:00:00.000Z', 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3'),
      ('d2c4aa08-daf8-4933-9d8d-bd170fb78d41', '2024-06-18T00:00:00.000Z', 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3'),
      ('214d2aea-e3e0-4bbc-8359-e2dc3ceb99b7', '2024-06-20T00:00:00.000Z', 'bc4aed48-5ae0-494c-b2c0-e986efc4cad3'),
      ('d4c3e710-5b5a-4d7a-a9e2-3c7d29c0a8b3', '2024-06-22T00:00:00.000Z', '6b00e451-bdc7-4ba3-8e79-0fd2921b6aa7'),
      ('e7e45623-8b37-4d9a-9f6d-3c8a1d5a9f23', '2024-06-24T00:00:00.000Z', '41c1e0ad-b045-4100-aa32-1946a2673411'),
      ('f9f5e120-1a7e-4b5b-8a8f-5c7a1d7a9b14', '2024-06-26T00:00:00.000Z', '4afcb811-c890-4039-9958-db1157bb4b56');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "alert_logs" WHERE id IN (
        'c6165067-c5b0-4eed-af94-02c7528a1e8e',
        'd2c4aa08-daf8-4933-9d8d-bd170fb78d41',
        '214d2aea-e3e0-4bbc-8359-e2dc3ceb99b7',
        'd4c3e710-5b5a-4d7a-a9e2-3c7d29c0a8b3',
        'e7e45623-8b37-4d9a-9f6d-3c8a1d5a9f23',
        'f9f5e120-1a7e-4b5b-8a8f-5c7a1d7a9b14'
      );
    `);
  }
}
