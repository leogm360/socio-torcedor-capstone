import { MigrationInterface, QueryRunner } from "typeorm";

export class implementEntities1652836322202 implements MigrationInterface {
    name = 'implementEntities1652836322202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clubs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bb09bd0c8d5238aeaa8f86ee0d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rewards" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "partnershipId" integer, CONSTRAINT "PK_3d947441a48debeb9b7366f8b8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partnerships" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55de3c169ff0d5d88e9a7cb0cd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "gender" character varying NOT NULL, "phone" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" integer, "partnershipId" integer, "clubId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "zip_code" character varying NOT NULL, "street" character varying NOT NULL, "number_house" character varying NOT NULL, "complement" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rewards" ADD CONSTRAINT "FK_6ba7117e461dffe99bf0ec46f32" FOREIGN KEY ("partnershipId") REFERENCES "partnerships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0fc03ee3a068800f55ca166eb14" FOREIGN KEY ("partnershipId") REFERENCES "partnerships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7c847424bb951725774214c5ac6" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7c847424bb951725774214c5ac6"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0fc03ee3a068800f55ca166eb14"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "rewards" DROP CONSTRAINT "FK_6ba7117e461dffe99bf0ec46f32"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "partnerships"`);
        await queryRunner.query(`DROP TABLE "rewards"`);
        await queryRunner.query(`DROP TABLE "clubs"`);
    }

}
