import app from "../../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

describe("Testing success cases in the routes Reward", () => {
  let connection: DataSource;

  const newRewardOne: any = {
    name: "5 Points",
    description: "Gain one ticket for match your team",
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

  test("Should be able to create a new Reward", async () => {
    const response = await request(app).post("/rewards").send(newRewardOne);

    newRewardOne.id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toContain("5 Points");
  });

  test("Should be able to list all Rewards", async () => {
    const response = await request(app).get("/rewards");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("Should be able to list one Reward", async () => {
    const response = await request(app).get("/rewards/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("Should be able to update one Reward", async () => {
    const response = await request(app)
      .patch("/rewards/1")
      .send({ name: "15 Points", description: "Alterado com sucesso" });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toContain("15 Points");
    expect(response.body.description).toContain("Alterado com sucesso");
  });

  test("Should be able to delete a Reward", async () => {
    const response = await request(app).delete(`/rewards/${newRewardOne.id}`);

    expect(response.status).toBe(204);
  });
});
