import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAgriculturInputs1693744290773 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'agricultural_inputs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'benefit',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('agricultural_inputs');
  }
}
