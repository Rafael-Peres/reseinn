import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {User} from '../entity/User'

export class users1572486626967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                isUnique: true,
                default: 'uuid_generate_v4()',
              },
              {
                name: 'username',
                type: 'varchar',
              },
              {
                name: 'fullname',
                type: 'varchar',
              },
              {
                name: 'email',
                type: 'varchar',
              },
              {
                name: 'document',
                type: 'varchar',
                length: '14',
              },
              {
                name: 'gender',
                type: 'genders',
                isNullable: true,
              },
              {
                name: 'birthdate',
                type: 'date',
                isNullable: true,
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
            ],
          }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('users');
    }

}


