import app from "../../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

describe("Testing success cases in the routes Clubs", () => {
  let connection: DataSource;

  let newClubOne: any = {
    name: "Curitiba FC",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((e) => console.error("AppDataSource failed to connect: ", e));
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new Club", async () => {
    const response = await request(app).post("/clubs").send(newClubOne);

    newClubOne.id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toContain("Curitiba FC");
  });

  test("Should be able to list all Clubs", async () => {
    const response = await request(app).get("/clubs");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("Should be able to list one Club", async () => {
    const response = await request(app).get("/clubs/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("Should be able to update one Club", async () => {
    const response = await request(app)
      .patch("/clubs/1")
      .send({ name: "Paysandu FC" });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toContain("Paysandu FC");
  });

  test("Should be able to delete a Club", async () => {
    const response = await request(app).delete(`/clubs/${newClubOne.id}`);

    expect(response.status).toBe(204);
  });
});
