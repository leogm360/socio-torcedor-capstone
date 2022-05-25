import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import useError from "../../../hooks/useError";
import {
  createRewardService,
  listRewardsService,
  listOneRewardService,
  editOneRewardService,
  deleteOneRewardService,
} from "../../../services";

describe("Unitary Create Reward Service on Success", () => {
  let connection: DataSource;

  const rewardOne = {
    name: "5 Points",
    description: "Gain one ticket for a match for your favorite team",
  };
  const rewardTwo = {
    name: "10 Points",
    description: "Gain one clothes for your favorite team",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((e) => console.error("AppDataSource failed to connect: ", e));

    const newReward = await createRewardService(rewardOne);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new Reward.", async () => {
    const reward = await createRewardService(rewardTwo);

    expect(reward).toHaveProperty("id");
    expect(reward).toHaveProperty("name");
    expect(reward).toHaveProperty("description");
    expect(reward).toBeTruthy();
  });

  test("Should be able to list all Rewards.", async () => {
    const listRewards = await listRewardsService();

    expect(listRewards).toHaveLength(2);
    expect(Array.isArray(listRewards)).toBeTruthy();
  });

  test("Should be able to list one Reward.", async () => {
    const listOneReward = await listOneRewardService("1");

    expect(listOneReward).toHaveProperty("id");
    expect(listOneReward).toHaveProperty("name");
    expect(listOneReward).toHaveProperty("description");
    expect(listOneReward.name).toContain("5 Points");
  });

  test("Should be able to update a Reward.", async () => {
    const club = await editOneRewardService({
      reward_id: "1",
      name: "Nova Reward",
      description: "Novo teste",
    });

    expect(club.name).toContain("Nova Reward");
    expect(club).toBeTruthy();
  });

  test("Should be able to delete a Reward.", async () => {
    const club = await deleteOneRewardService("1");

    expect(club).toBeTruthy();
  });
});

describe("Unitary Create Reward Service on Fail", () => {
  let connection: DataSource;

  const { errConflict, errNotFound } = useError();

  const rewardOne = {
    name: "5 Points",
    description: "Gain one ticket for a match for your favorite team",
  };
  const rewardTwo = {
    name: "10 Points",
    description: "Gain one clothes for your favorite team",
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

  it("Should throw errConflict for registering a repeated Reward.", async () => {
    const newClub = await createRewardService(rewardOne);

    try {
      await createRewardService(rewardOne);
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for listOne a unexisting Reward.", async () => {
    try {
      await listOneRewardService("100");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errConflict for update a repeated Club.", async () => {
    try {
      await editOneRewardService({
        reward_id: "1",
        name: "5 Points",
        description: "Novo teste",
      });
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for update a unexisting Club.", async () => {
    try {
      await editOneRewardService({
        reward_id: "100",
        name: "25 Points",
        description: "Novo teste",
      });
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errNotFound for delete a unexisting Club.", async () => {
    try {
      await deleteOneRewardService("100");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });
});
