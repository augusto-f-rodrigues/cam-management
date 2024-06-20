import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCameras1627483741924 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "cameras" (id, name, ip, is_enabled, customer_id) VALUES
      ('bc4aed48-5ae0-494c-b2c0-e986efc4cad3', 'camera-augusto-01', '0.0.0.0', true, 'a598ae4b-824d-4377-b043-60cb31d5ac58'),
      ('6b00e451-bdc7-4ba3-8e79-0fd2921b6aa7', 'camera-augusto-02', '255.255.255.255', false, 'a598ae4b-824d-4377-b043-60cb31d5ac58'),
      ('41c1e0ad-b045-4100-aa32-1946a2673411', 'camera-murilo-01', '0.0.0.0', true, '8f7101c3-6ba0-4225-ab85-377470b618a4'),
      ('4afcb811-c890-4039-9958-db1157bb4b56', 'camera-mediotti-01', '0.0.0.0', true, '78c4490e-5bca-4b70-b7ef-fc1152c386c7');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "cameras" WHERE id IN (
        'bc4aed48-5ae0-494c-b2c0-e986efc4cad3',
        '6b00e451-bdc7-4ba3-8e79-0fd2921b6aa7',
        '41c1e0ad-b045-4100-aa32-1946a2673411',
        '4afcb811-c890-4039-9958-db1157bb4b56'
      );
    `);
  }
}
