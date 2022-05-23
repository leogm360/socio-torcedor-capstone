import { DataSource } from "typeorm";
import { array } from "yup";
import { AppDataSource } from "../../../data-source";
import partnershipCreateService from "../../../services/partnerships/create.service";

describe("Create a Partnerships", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new partnership", async () => {
    const createPartnership = await partnershipCreateService({
      name: "Premium",
      price: 300.0,
      rewards_id: [],
    });

    expect(createPartnership).toHaveProperty("id");
    expect(createPartnership).toHaveProperty("name");
    expect(createPartnership).toHaveProperty("price");
    expect(createPartnership).toHaveProperty("rewards");
  });
});
