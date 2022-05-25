import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as uuid from "uuid";
import {
  createUserService,
  loginUserService,
  listUsersService,
  listOneUserService,
  listMeUserService,
  editOneUserService,
  editMeUserService,
  deleteOneUserService,
  deleteMeUserService,
} from "../../../services";
import useRepo from "../../../hooks/useRepo";
import useError from "../../../hooks/useError";
import { User, Address, Club, Partnership } from "../../../entities";

jest.mock("uuid");

const { clubs, partnerships } = useRepo();
const { errNotFound, errConflict } = useError();

const nameOne = "Test User One";
const userNameOne = "testusertone";
const emailOne = "testuserone@test.com";
const passwordOne = "123456789";
const ageOne = 20;
const genderOne = "Masculino";
const phoneOne = "21999999999";
const isAdmOne = true;

const nameTwo = "Test User Two";
const userNameTwo = "testusertwo";
const emailTwo = "testusertwo@test.com";
const passwordTwo = "987654321";
const ageTwo = 20;
const genderTwo = "Masculino";
const phoneTwo = "21999999999";
const isAdmTwo = false;

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
  name: nameOne,
  userName: userNameOne,
  email: emailOne,
  password: passwordOne,
  age: ageOne,
  gender: genderOne,
  phone: phoneOne,
  address: address,
  clubId: 1,
  partnershipId: 1,
  isAdm: isAdmOne,
};

const userTwo = {
  name: nameTwo,
  userName: userNameTwo,
  email: emailTwo,
  password: passwordTwo,
  age: ageTwo,
  gender: genderTwo,
  phone: phoneTwo,
  address: address,
  clubId: 1,
  partnershipId: 1,
  isAdm: isAdmTwo,
};

const club = {
  name: "São Paulo FC",
};

const partnership = {
  name: "Partner Basic",
  price: 80.73,
  rewards: [],
};

describe("Unitary User Services on Success", () => {
  let connection: DataSource;

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

  it("Should be able create an User with an unexisting address.", async () => {
    const uuidSpy = jest.spyOn(uuid, "v4");
    uuidSpy.mockReturnValue("8575e51f-2d48-4297-be3f-c59931638544");

    userOne.password = await bcrypt.hash(userOne.password, 10);

    const newUser = await createUserService(userOne);

    expect(newUser).toBeTruthy();
    expect(newUser).toBeInstanceOf(User);
    expect(newUser).toEqual(
      expect.objectContaining({
        id: "8575e51f-2d48-4297-be3f-c59931638544",
        name: nameOne,
        userName: userNameOne,
        email: emailOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        isAdm: isAdmOne,
      })
    );
    expect(newUser?.address).toBeInstanceOf(Address);
    expect(newUser?.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(newUser?.club).toBeInstanceOf(Club);
    expect(newUser?.club).toEqual(expect.objectContaining(club));
    expect(newUser?.partnership).toBeInstanceOf(Partnership);
    expect(newUser?.partnership).toEqual(expect.objectContaining(partnership));
  });

  it("Should be able create an User within an existing address.", async () => {
    const uuidSpy = jest.spyOn(uuid, "v4");
    uuidSpy.mockReturnValue("8575e51f-2d48-4297-be3f-c59931638545");

    userTwo.password = await bcrypt.hash(userTwo.password, 10);

    const newUser = await createUserService(userTwo);

    expect(newUser).toBeTruthy();
    expect(newUser).toBeInstanceOf(User);
    expect(newUser).toEqual(
      expect.objectContaining({
        id: "8575e51f-2d48-4297-be3f-c59931638545",
        name: nameTwo,
        userName: userNameTwo,
        email: emailTwo,
        age: ageTwo,
        gender: genderTwo,
        phone: phoneTwo,
        isAdm: isAdmTwo,
      })
    );
    expect(newUser?.address).toBeInstanceOf(Address);
    expect(newUser?.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(newUser?.club).toBeInstanceOf(Club);
    expect(newUser?.club).toEqual(expect.objectContaining(club));
    expect(newUser?.partnership).toBeInstanceOf(Partnership);
    expect(newUser?.partnership).toEqual(expect.objectContaining(partnership));
  });

  it("Should be able login using email/password with an existing User.", async () => {
    const token = await loginUserService({
      email: emailOne,
      password: passwordOne,
    });

    const decoded = jwt.decode(token);

    expect(decoded).toBeTruthy();
    expect(decoded).toEqual(
      expect.objectContaining({
        userEmail: emailOne,
      })
    );
  });

  it("Should be able login using userName/password with an existing User.", async () => {
    const token = await loginUserService({
      userName: userNameTwo,
      password: passwordTwo,
    });

    const decoded = jwt.decode(token);

    expect(decoded).toBeTruthy();
    expect(decoded).toEqual(
      expect.objectContaining({
        userEmail: emailTwo,
      })
    );
  });

  it("Should be able to list all Users.", async () => {
    const users = await listUsersService();

    expect(users).toHaveProperty("map");
    expect(users).toHaveLength(2);
    expect(users[0]).toBeInstanceOf(User);
    expect(users[1]).toBeInstanceOf(User);
  });

  it("Should be able to list one User by id.", async () => {
    const user = await listOneUserService(
      "8575e51f-2d48-4297-be3f-c59931638544"
    );

    expect(user).toBeTruthy();
    expect(user).toBeInstanceOf(User);
    expect(user).toEqual(
      expect.objectContaining({
        name: nameOne,
        userName: userNameOne,
        email: emailOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        isAdm: isAdmOne,
      })
    );
    expect(user.address).toBeInstanceOf(Address);
    expect(user.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(user.club).toBeInstanceOf(Club);
    expect(user.club).toEqual(expect.objectContaining(club));
    expect(user.partnership).toBeInstanceOf(Partnership);
    expect(user.partnership).toEqual(expect.objectContaining(partnership));
  });

  it("Should be able to list one User by user email.", async () => {
    const user = await listMeUserService(emailTwo);

    expect(user).toBeTruthy();
    expect(user).toBeInstanceOf(User);
    expect(user).toEqual(
      expect.objectContaining({
        id: "8575e51f-2d48-4297-be3f-c59931638545",
        name: nameTwo,
        userName: userNameTwo,
        email: emailTwo,
        age: ageTwo,
        gender: genderTwo,
        phone: phoneTwo,
        isAdm: isAdmTwo,
      })
    );
    expect(user.address).toBeInstanceOf(Address);
    expect(user.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(user.club).toBeInstanceOf(Club);
    expect(user.club).toEqual(expect.objectContaining(club));
    expect(user.partnership).toBeInstanceOf(Partnership);
    expect(user.partnership).toEqual(expect.objectContaining(partnership));
  });
});

describe("Unitary User Services on Fail", () => {
  let connection: DataSource;

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
