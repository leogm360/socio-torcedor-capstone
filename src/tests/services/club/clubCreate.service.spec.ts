import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import useError from "../../../hooks/useError";
import {
  createClubService,
  listClubsService,
  listOneClubService,
  editOneClubService,
  deleteOneClubService,
} from "../../../services";

describe("Unitary Create Club Service on Success", () => {
  let connection: DataSource;

  const clubOne = {
    name: "São Paulo FC",
  };
  const clubTwo = {
    name: "Fluminense FC",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((e) => console.error("AppDataSource failed to connect: ", e));

    const newClub = await createClubService(clubOne);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new Club.", async () => {
    const club = await createClubService(clubTwo);

    expect(club).toHaveProperty("id");
    expect(club).toHaveProperty("name");
    expect(club).toBeTruthy();
  });

  test("Should be able to list all Clubs.", async () => {
    const listClubs = await listClubsService();

    expect(listClubs).toHaveLength(2);
    expect(Array.isArray(listClubs)).toBeTruthy();
  });

  test("Should be able to list one Club.", async () => {
    const listOneClub = await listOneClubService("1");

    expect(listOneClub).toHaveProperty("id");
    expect(listOneClub).toHaveProperty("name");
    expect(listOneClub.name).toContain("São Paulo FC");
  });

  test("Should be able to update a Club.", async () => {
    const club = await editOneClubService({
      club_id: "1",
      name: "Corinthians FC",
    });

    expect(club.name).toContain("Corinthians FC");
    expect(club).toBeTruthy();
  });

  test("Should be able to delete a Club.", async () => {
    const club = await deleteOneClubService("1");

    expect(club).toBeTruthy();
  });
});

describe("Unitary Create Club Service on Fail", () => {
  let connection: DataSource;

  const { errConflict, errNotFound } = useError();

  const clubOne = {
    name: "São Paulo FC",
  };
  const clubTwo = {
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
    const newClub = await createClubService(clubOne);

    try {
      await createClubService(clubOne);
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for listOne a unexisting Club.", async () => {
    try {
      await listOneClubService("100");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errConflict for update a repeated Club.", async () => {
    try {
      await editOneClubService({
        club_id: "1",
        name: "São Paulo FC",
      });
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for update a unexisting Club.", async () => {
    try {
      await editOneClubService({
        club_id: "100",
        name: "São Paulo FC",
      });
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errNotFound for delete a unexisting Club.", async () => {
    try {
      await deleteOneClubService("100");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });
});
