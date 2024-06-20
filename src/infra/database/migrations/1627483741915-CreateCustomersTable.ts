import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomersTable1627483741915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(126) NOT NULL, CONSTRAINT "UQ_customers_name" UNIQUE ("name"), CONSTRAINT "PK_customers_id" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
