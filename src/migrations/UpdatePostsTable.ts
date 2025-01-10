import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePostsTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE posts ALTER COLUMN content SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE posts ALTER COLUMN content DROP NOT NULL`);
  }
}