import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAlertLogTable1627483741917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "alert_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "occurred_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "camera_id" uuid NOT NULL, CONSTRAINT "PK_alert_logs_is" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert_logs" ADD CONSTRAINT "FK_alert_logs_camera_id" FOREIGN KEY ("camera_id") REFERENCES "cameras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "alert_logs" DROP CONSTRAINT "FK_alert_logs_camera_id"`,
    );
    await queryRunner.query(`DROP TABLE "alert_logs"`);
  }
}
