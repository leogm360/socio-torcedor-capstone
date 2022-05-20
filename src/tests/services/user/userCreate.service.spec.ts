import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import createUserService from "../../../services/users/create.service";
import useRepo from "../../../hooks/useRepo";
import useError from "../../../hooks/useError";

describe("Unitary Create User Service on Success", () => {
  let connection: DataSource;

  const { addresses, clubs, partnerships } = useRepo();

  const address = {
    zip_code: "59152280",
    street: "Rua Poço Branco",
    number_house: "12",
    complement: undefined,
    city: "Nova Parnamirim",
    state: "RN",
    country: "Brasil",
  };

  const userOne = {
    name: "Test User One",
    user_name: "testusertone",
    email: "testuserone@test.com",
    password: "123456789",
    age: 20,
    gender: "Masculino",
    phone: "21999999999",
    address: address,
    club_id: 1,
    partnership_id: 1,
    is_adm: true,
  };

  const userTwo = {
    name: "Test User Two",
    user_name: "testusertwo",
    email: "testusertwo@test.com",
    password: "123456789",
    age: 20,
    gender: "Masculino",
    phone: "21999999999",
    address: address,
    club_id: 1,
    partnership_id: 1,
    is_adm: true,
  };

  const club = {
    name: "São Paulo FC",
  };

  const partnership = {
    name: "Partner Basic",
    price: 80.73,
    rewards: [],
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((e) => console.error("AppDataSource failed to connect: ", e));

    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should create a User with an unexisting address.", async () => {
    const newUser = await createUserService(userOne);

    const {
      partnership_id: a,
      club_id: b,
      address: c,
      password: d,
      ...modifiedUser
    } = userOne;
    const { partnership: f, club: g, address: h, ...modifiedNewUser } = newUser;

    expect(modifiedNewUser).toEqual(expect.objectContaining(modifiedUser));
    expect(newUser.address).toEqual(
      expect.objectContaining({
        ...address,
        complement: null,
      })
    );
    expect(newUser.club).toEqual(expect.objectContaining(club));
    expect(newUser.partnership).toEqual(expect.objectContaining(partnership));
  });

  it("Should create a User within an existing address.", async () => {
    const newUser = await createUserService(userTwo);

    const {
      partnership_id: a,
      club_id: b,
      address: c,
      password: d,
      ...modifiedUser
    } = userTwo;
    const { partnership: f, club: g, address: h, ...modifiedNewUser } = newUser;

    expect(modifiedNewUser).toEqual(expect.objectContaining(modifiedUser));
    expect(newUser.address).toEqual(
      expect.objectContaining({
        ...address,
        complement: null,
      })
    );
    expect(newUser.club).toEqual(expect.objectContaining(club));
    expect(newUser.partnership).toEqual(expect.objectContaining(partnership));
  });
});

describe("Unitary Create User Service on Fail", () => {
  let connection: DataSource;

  const { addresses, clubs, partnerships } = useRepo();
  const { errNotFound, errConflict } = useError();

  const address = {
    zip_code: "59152280",
    street: "Rua Poço Branco",
    number_house: "12",
    complement: undefined,
    city: "Nova Parnamirim",
    state: "RN",
    country: "Brasil",
  };

  const userOne = {
    name: "Test User One",
    user_name: "testusertone",
    email: "testuserone@test.com",
    password: "123456789",
    age: 20,
    gender: "Masculino",
    phone: "21999999999",
    address: address,
    club_id: 1,
    partnership_id: 1,
    is_adm: true,
  };

  const userTwo = {
    name: "Test User Two",
    user_name: "testusertwo",
    email: "testusertwo@test.com",
    password: "123456789",
    age: 20,
    gender: "Masculino",
    phone: "21999999999",
    address: address,
    club_id: 1,
    partnership_id: 1,
    is_adm: true,
  };

  const club = {
    name: "São Paulo FC",
  };

  const partnership = {
    name: "Partner Basic",
    price: 80.73,
    rewards: [],
  };

  beforeEach(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((e) => console.error("AppDataSource failed to connect: ", e));
  });

  afterEach(async () => {
    await connection.destroy();
  });

  it("Should throw errConflict for registering a repeated User.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);

    await partnerships.save(newPartnership);

    await createUserService(userOne);

    try {
      await createUserService(userOne);
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for unexisting Club.", async () => {
    const newPartnership = partnerships.create(partnership);

    await partnerships.save(newPartnership);

    try {
      await createUserService(userTwo);
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errNotFound for unexisting Partnership.", async () => {
    const newClub = clubs.create(club);

    await clubs.save(newClub);

    try {
      await createUserService(userTwo);
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });
});
