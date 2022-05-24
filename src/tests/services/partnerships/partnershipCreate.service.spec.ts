import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import useError from "../../../hooks/useError";
import useRepo from "../../../hooks/useRepo";
import { ICreatePartnership } from "../../../interfaces/partnership";
import partnershipCreateService from "../../../services/partnerships/create.service";
import partnershipDeleteOneService from "../../../services/partnerships/deleteOne.service";
import partinershipsListService from "../../../services/partnerships/list.service";
import partnershipListOneService from "../../../services/partnerships/listOne.service";
import partnershipUpdateOneService from "../../../services/partnerships/updateOne.service";
import rewardCreateService from "../../../services/rewards/create.service";

describe("Create a Partnerships", () => {
  let connection: DataSource;

  const partnershipOne: ICreatePartnership = {
    name: "Socio-Vip",
    price: 450.0,
    rewards_id: [],
  };

  const partnershipTwo: ICreatePartnership = {
    name: "Socio-Black",
    price: 500.0,
    rewards_id: [],
  };

  const { rewards } = useRepo();

  const reward = {
    name: "free matches",
    description: "three free matches",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );

    const newPartnership = await partnershipCreateService(partnershipOne);
    const newRewards = await rewardCreateService(reward);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new partnership.", async () => {
    const createPartnership = await partnershipCreateService(partnershipTwo);

    expect(createPartnership).toHaveProperty("id");
    expect(createPartnership).toHaveProperty("name");
    expect(createPartnership).toHaveProperty("price");
    expect(createPartnership).toHaveProperty("rewards");
    expect(typeof createPartnership.name).toBe("string");
    expect(typeof createPartnership.price).toBe("number");
    expect(Array.isArray(createPartnership.rewards)).toBeTruthy();
  });

  test("Should be able to list all Partnerships.", async () => {
    const listPartinerships = await partinershipsListService();

    expect(listPartinerships).toHaveLength(2);
    expect(Array.isArray(listPartinerships)).toBeTruthy();
  });

  test("Should be able to list one Partinership", async () => {
    const listOnePartnership = await partnershipListOneService("1");

    expect(listOnePartnership).toHaveProperty("id");
    expect(listOnePartnership).toHaveProperty("name");
    expect(listOnePartnership).toHaveProperty("price");
    expect(listOnePartnership).toHaveProperty("rewards");
    expect(listOnePartnership.name).toContain("Socio-Vip");
    expect(listOnePartnership).toBeTruthy();
  });

  test("Should be able to update a partnership", async () => {
    const updatePartnership = await partnershipUpdateOneService({
      partnership_id: "1",
      name: "Prata",
      price: 100.0,
      rewards_id: [1],
    });
    expect(updatePartnership).toHaveProperty("id");
    expect(updatePartnership).toHaveProperty("name");
    expect(updatePartnership).toHaveProperty("price");
    expect(updatePartnership).toHaveProperty("rewards");
    expect(updatePartnership.rewards).toHaveLength(1);
  });

  test("Should be able to delete a Partnership.", async () => {
    const partnership = await partnershipDeleteOneService("1");

    expect(partnership).toBeTruthy();
  });
});

describe("Unitary Create User Service on Fail", () => {
  let connection: DataSource;

  const { errConflict, errNotFound } = useError();

  const partnershipOne: ICreatePartnership = {
    name: "Socio-Vip",
    price: 450.0,
    rewards_id: [],
  };

  const partnershipTwo: ICreatePartnership = {
    name: "Socio-Black",
    price: 500.0,
    rewards_id: [],
  };

  const { rewards } = useRepo();

  const reward = {
    name: "free matches",
    description: "three free matches",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );

    const newReward = await rewardCreateService(reward);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should throw errConflict for registering a repeated Partnership.", async () => {
    const newPartnership = await partnershipCreateService(partnershipOne);

    try {
      await partnershipCreateService(partnershipOne);
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for listOne a unexisting Partnership.", async () => {
    try {
      await partnershipListOneService("100");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errConflict for update a repeated Partnership.", async () => {
    try {
      await partnershipUpdateOneService({
        partnership_id: "1",
        name: "Prata",
        price: 100.0,
        rewards_id: [1],
      });
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for update a unexisting Partnership.", async () => {
    try {
      await partnershipUpdateOneService({
        partnership_id: "100",
        name: "Prata",
        price: 100.0,
        rewards_id: [1],
      });
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errNotFound for delete a unexisting Partnership.", async () => {
    try {
      await partnershipDeleteOneService("100");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });
});
