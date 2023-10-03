import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCropsDestination1693744290772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'crops_destination',
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
            name: 'destination',
            type: 'varchar',
          },
          {
            name: 'processing_type',
            type: 'varchar',
          },
          {
            name: 'quantity',
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
            name: 'area_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'crop_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'crops_destination',
      new TableForeignKey({
        name: 'AreasCrops',
        columnNames: ['area_id'],
        referencedTableName: 'areas',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'crops_destination',
      new TableForeignKey({
        name: 'CropsCropsDestiny',
        columnNames: ['crop_id'],
        referencedTableName: 'crops',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('crops_destination');
    await queryRunner.dropForeignKey('crops_destination', 'AreasCrops');
    await queryRunner.dropForeignKey('crops_destination', 'CropsCropsDestiny');
  }
}
