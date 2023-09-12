import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateArea1693744290769 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'areas',
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
            name: 'species',
            type: 'varchar',
          },
          {
            name: 'variety',
            type: 'varchar',
          },
          {
            name: 'driving_system',
            type: 'varchar',
          },
          {
            name: 'rookstock_type',
            type: 'varchar',
          },
          {
            name: 'cultivated_area',
            type: 'int',
          },
          {
            name: 'geographic_coordinates',
            type: 'varchar',
          },
          {
            name: 'implementation_date',
            type: 'date',
          },
          {
            name: 'number_rows',
            type: 'int',
          },
          {
            name: 'distance_between_rows',
            type: 'int',
          },
          {
            name: 'distance_between_plants',
            type: 'int',
          },
          {
            name: 'number_plants',
            type: 'int',
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
            name: 'property_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'areas',
      new TableForeignKey({
        name: 'AreasProperty',
        columnNames: ['property_id'],
        referencedTableName: 'propertys',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('areas');
    await queryRunner.dropForeignKey('areas', 'AreasProperty');
  }
}
