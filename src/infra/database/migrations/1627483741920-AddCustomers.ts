import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCustomers1627483741920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "customers" (id, name) VALUES
      ('a598ae4b-824d-4377-b043-60cb31d5ac58', 'Augusto F. Rodrigues'),
      ('8f7101c3-6ba0-4225-ab85-377470b618a4', 'Murilo H. Teixeira'),
      ('78c4490e-5bca-4b70-b7ef-fc1152c386c7', 'Gabriel Mediotti');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "customers" WHERE id IN (
        'a598ae4b-824d-4377-b043-60cb31d5ac58',
        '8f7101c3-6ba0-4225-ab85-377470b618a4',
        '78c4490e-5bca-4b70-b7ef-fc1152c386c7'
      );
    `);
  }
}
