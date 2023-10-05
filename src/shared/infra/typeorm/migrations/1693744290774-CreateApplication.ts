import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateApplication1693744290774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'application',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'application_type',
            type: 'varchar',
          },
          {
            name: 'used_product',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'application_date',
            type: 'date',
          },
          {
            name: 'application_time',
            type: 'int',
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
          {
            name: 'area_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'application',
      new TableForeignKey({
        name: 'AreasApplications',
        columnNames: ['area_id'],
        referencedTableName: 'areas',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('application');
    await queryRunner.dropForeignKey('application', 'AreasApplications');
  }
}
