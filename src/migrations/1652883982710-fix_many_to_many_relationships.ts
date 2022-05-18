import { MigrationInterface, QueryRunner } from "typeorm";

export class fixManyToManyRelationships1652883982710 implements MigrationInterface {
    name = 'fixManyToManyRelationships1652883982710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rewards" DROP CONSTRAINT "FK_6ba7117e461dffe99bf0ec46f32"`);
        await queryRunner.query(`ALTER TABLE "rewards" DROP COLUMN "partnershipId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rewards" ADD "partnershipId" integer`);
        await queryRunner.query(`ALTER TABLE "rewards" ADD CONSTRAINT "FK_6ba7117e461dffe99bf0ec46f32" FOREIGN KEY ("partnershipId") REFERENCES "partnerships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
