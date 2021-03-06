import { DataSource } from "typeorm";
import "reflect-metadata";
import "dotenv/config";

export const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.ts"],
        logging: false,
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        synchronize: false,
        logging: false,
        entities:
          process.env.NODE_ENV === "production"
            ? ["dist/src/entities/*.js"]
            : ["src/entities/*.ts"],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["dist/src/migrations/*.js"]
            : ["src/migrations/*.ts"],
      });

// type: "postgres",
//   host: "localhost",
//   username: process.env.POSTGRES_TEST_USER,
//   database: process.env.POSTGRES_TEST_DB,
//   password: process.env.POSTGRES_TEST_PWD,
//   port: 5432,
//   entities: ["src/entities/*.ts"],
//   migrations: ["src/migrations/*.ts"],
//   logging: false,
//   synchronize: true,
//   dropSchema: true,
