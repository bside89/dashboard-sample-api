import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1708301400000 implements MigrationInterface {
  name = 'CreateUserTable1708301400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migration marcada como executada - tabela users já existe no banco
    // Esta migration representa o estado inicial da tabela users
    const hasTable = await queryRunner.hasTable('users');

    if (!hasTable) {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar',
              length: '255',
              isNullable: false,
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
              isNullable: false,
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
              onUpdate: 'now()',
              isNullable: false,
            },
            {
              name: 'role',
              type: 'varchar',
              length: '50',
              default: "'user'",
              isNullable: false,
            },
            {
              name: 'document_number',
              type: 'varchar',
              length: '20',
              isNullable: false,
              isUnique: true,
            },
          ],
        }),
        true,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
