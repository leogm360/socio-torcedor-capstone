import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import useError from "../../../hooks/useError";
import clubCreateService from "../../../services/club/create.service";
import clubUpdateOneService from "../../../services/club/updateOne.service";
import clubDeleteOneService from "../../../services/club/deleteOne.service";
import clubListService from "../../../services/club/list.service";
import clubListOneService from "../../../services/club/listOne.service";

describe("Unitary Create Club Service on Success", () => {
  let connection: DataSource;

  const clubOne: any = {
    name: "São Paulo FC",
  };
  const clubTwo: any = {
    name: "Fluminense FC",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((e) => console.error("AppDataSource failed to connect: ", e));

    const newClub = await clubCreateService(clubOne);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new Club.", async () => {
    const club = await clubCreateService(clubTwo);

    expect(club).toHaveProperty("id");
    expect(club).toHaveProperty("name");
    expect(club).toBeTruthy();
  });

  test("Should be able to list all Clubs.", async () => {
    const listClubs = await clubListService();

    expect(listClubs).toHaveLength(2);
    expect(Array.isArray(listClubs)).toBeTruthy();
  });

  test("Should be able to list one Club.", async () => {
    const listOneClub = await clubListOneService("1");

    expect(listOneClub).toHaveProperty("id");
    expect(listOneClub).toHaveProperty("name");
    expect(listOneClub.name).toContain("São Paulo FC");
  });

  test("Should be able to update a Club.", async () => {
    const club = await clubUpdateOneService({
      club_id: "1",
      name: "Corinthians FC",
    });

    expect(club.name).toContain("Corinthians FC");
    expect(club).toBeTruthy();
  });

  test("Should be able to delete a Club.", async () => {
    const club = await clubDeleteOneService("1");

    expect(club).toBeTruthy();
  });
});

describe("Unitary Create Club Service on Fail", () => {
  let connection: DataSource;

  const { errConflict, errNotFound } = useError();

  const clubOne = {
    name: "São Paulo FC",
  };
  const clubTwo: any = {
    name: "Fluminense FC",
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

  it("Should throw errConflict for registering a repeated Club.", async () => {
    const newClub = await clubCreateService(clubOne);

    try {
      await clubCreateService(clubOne);
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for listOne a unexisting Club.", async () => {
    try {
      await clubListOneService("100");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errConflict for update a repeated Club.", async () => {
    try {
      await clubUpdateOneService({
        club_id: "1",
        name: "São Paulo FC",
      });
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for update a unexisting Club.", async () => {
    try {
      await clubUpdateOneService({
        club_id: "100",
        name: "São Paulo FC",
      });
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errNotFound for delete a unexisting Club.", async () => {
    try {
      await clubDeleteOneService("100");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });
});
