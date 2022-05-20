import { DataSource } from "typeorm";
import "reflect-metadata";
import "dotenv/config";

export const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "postgres",
        host: "localhost",
        username: process.env.POSTGRES_TEST_USER,
        database: process.env.POSTGRES_TEST_DB,
        password: process.env.POSTGRES_TEST_PWD,
        port: 5432,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
        synchronize: true,
        dropSchema: true,
        logging: false,
      })
    : new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PWD,
        database: process.env.POSTGRES_DB,
        synchronize: false,
        logging: true,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      });
