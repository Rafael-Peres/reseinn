import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Jobs1572542742214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'jobs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'salary',
            type: 'int',
          },
          {
            name: 'company',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'requirements',
            type: 'varchar',
          },
          {
            name: 'benefits',
            type: 'varchar',
          },
          {
            name: 'work_schedule',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'recruiter_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('jobs');
  }
}
