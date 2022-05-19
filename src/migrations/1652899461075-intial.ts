import { MigrationInterface, QueryRunner } from "typeorm";

export class intial1652899461075 implements MigrationInterface {
    name = 'intial1652899461075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clubs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bb09bd0c8d5238aeaa8f86ee0d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rewards" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d947441a48debeb9b7366f8b8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partnerships" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55de3c169ff0d5d88e9a7cb0cd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "gender" character varying NOT NULL, "phone" character varying NOT NULL, "is_adm" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" integer, "partnershipId" integer, "clubId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "zip_code" character varying NOT NULL, "street" character varying NOT NULL, "number_house" character varying NOT NULL, "complement" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partnerships_rewards_rewards" ("partnershipsId" integer NOT NULL, "rewardsId" integer NOT NULL, CONSTRAINT "PK_a2f4a3cf24cebef03a1b9b9800c" PRIMARY KEY ("partnershipsId", "rewardsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6191267d7079d1e200a1840955" ON "partnerships_rewards_rewards" ("partnershipsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5a35b91b7737a064bc85feebdb" ON "partnerships_rewards_rewards" ("rewardsId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0fc03ee3a068800f55ca166eb14" FOREIGN KEY ("partnershipId") REFERENCES "partnerships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7c847424bb951725774214c5ac6" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partnerships_rewards_rewards" ADD CONSTRAINT "FK_6191267d7079d1e200a1840955f" FOREIGN KEY ("partnershipsId") REFERENCES "partnerships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "partnerships_rewards_rewards" ADD CONSTRAINT "FK_5a35b91b7737a064bc85feebdb5" FOREIGN KEY ("rewardsId") REFERENCES "rewards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partnerships_rewards_rewards" DROP CONSTRAINT "FK_5a35b91b7737a064bc85feebdb5"`);
        await queryRunner.query(`ALTER TABLE "partnerships_rewards_rewards" DROP CONSTRAINT "FK_6191267d7079d1e200a1840955f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7c847424bb951725774214c5ac6"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0fc03ee3a068800f55ca166eb14"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a35b91b7737a064bc85feebdb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6191267d7079d1e200a1840955"`);
        await queryRunner.query(`DROP TABLE "partnerships_rewards_rewards"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "partnerships"`);
        await queryRunner.query(`DROP TABLE "rewards"`);
        await queryRunner.query(`DROP TABLE "clubs"`);
    }

}
