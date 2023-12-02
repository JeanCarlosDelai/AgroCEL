import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCropsSale1693744290777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'crops_sale',
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
            name: 'purchasing_entity',
            type: 'varchar',
          },
          {
            name: 'purchasing_entity_cnpj',
            type: 'varchar',
          },
          {
            name: 'graduation',
            type: 'int',
          },
          {
            name: 'price',
            type: 'int',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'discharge_date',
            type: 'date',
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
      'crops_sale',
      new TableForeignKey({
        name: 'AreasCrops',
        columnNames: ['area_id'],
        referencedTableName: 'areas',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'crops_sale',
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
    await queryRunner.dropTable('crops_sale');
    await queryRunner.dropForeignKey('crops_sale', 'AreasCrops');
    await queryRunner.dropForeignKey('crops_sale', 'CropsCropsDestiny');
  }
}
