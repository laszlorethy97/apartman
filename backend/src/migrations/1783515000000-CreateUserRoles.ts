import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRoles1783515000000 implements MigrationInterface {
    name = 'CreateUserRoles1783515000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`user_roles_role\` (\`userId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_user_roles_userId\` (\`userId\`), INDEX \`IDX_user_roles_roleId\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`);
        
        // Add foreign key constraints safely - ignore if they already exist
        try {
            await queryRunner.query(`ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_user_roles_userId\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        } catch (error: any) {
            if (!error.message.includes('already exists')) {
                throw error;
            }
        }
        
        try {
            await queryRunner.query(`ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_user_roles_roleId\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        } catch (error: any) {
            if (!error.message.includes('already exists')) {
                throw error;
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_user_roles_roleId\``);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_user_roles_userId\``);
        await queryRunner.query(`DROP TABLE \`user_roles_role\``);
    }
}
