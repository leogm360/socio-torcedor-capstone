import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { ICreatePartnership } from "../../../interfaces/partnership";
import { IRewardCreate } from "../../../interfaces/rewards";

describe("Testing the Partnerships router", () => {
  let connection: DataSource;

  const partnershipOne: ICreatePartnership = {
    name: "Socio-Vip",
    price: 450.0,
    rewards_id: [],
  };

  const { name, price, rewards_id } = partnershipOne;

  const rewardsOne: IRewardCreate = {
    name: "for black partners",
    description: "40% discount on tickets",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("should be able to create a new Partnership", async () => {
    const partnershipData = partnershipOne;

    const response = await request(app)
      .post("/partnerships")
      .send(partnershipData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name,
        price,
        rewards: [],
      })
    );
  });

  test("should be able tp return a list of all registred Partnerships.", async () => {
    const response = await request(app).get("/partnerships");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("find");
  });

  test("Should be able to list one Partnership.", async () => {
    const response = await request(app).get("/partnerships/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
      })
    );
  });

  test("Should be able to update one Partnership", async () => {
    const resReward = await request(app).post("/rewards").send(rewardsOne);

    const response = await request(app)
      .patch("/partnerships/1")
      .send({
        rewards_id: [1],
      });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.rewards[0].id).toBe(1);
  });

  test("Should be able to delete one Partinership", async () => {
    const response = await request(app).delete(`/partnerships/1`);

    expect(response.status).toBe(204);
  });
});
