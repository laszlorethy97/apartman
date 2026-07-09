import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReservation1783513987278 implements MigrationInterface {
    name = 'UpdateReservation1783513987278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`apartman\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`address\` varchar(255) NOT NULL, \`capacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`apartmanId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_7f4666a644fc3ef1c138d0e8feb\` FOREIGN KEY (\`apartmanId\`) REFERENCES \`apartman\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_7f4666a644fc3ef1c138d0e8feb\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`apartmanId\``);
        await queryRunner.query(`DROP TABLE \`apartman\``);
    }

}
