import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCameraTable1627483741916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cameras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(126) NOT NULL, "ip" character varying(126) NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "customer_id" uuid NOT NULL, CONSTRAINT "PK_camera_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cameras" ADD CONSTRAINT "FK_cameras_customers_id" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cameras" DROP CONSTRAINT "FK_cameras_customers_id"`,
    );
    await queryRunner.query(`DROP TABLE "cameras"`);
  }
}
