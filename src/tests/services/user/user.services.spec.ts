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

const { users, clubs, partnerships } = useRepo();
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
    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638544");

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
    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638545");

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

  it("Should be able to list one User by user id.", async () => {
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

  it("Should be able to edit one User data by user id.", async () => {
    const newAddress = {
      zip_code: "68903771",
      street: "1ª Travessa Setentrional",
      number_house: "13",
      complement: "Bairro Araxá",
      city: "Macapá",
      state: "AP",
      country: "Brasil",
    };

    const newClub = clubs.create({
      name: "Fortaleza FC",
    });

    const newPartnership = partnerships.create({
      name: "Partner Premium",
      price: 105.72,
      rewards: [],
    });

    await clubs.save(newClub);

    await partnerships.save(newPartnership);

    const name = "Test User Three";
    const userName = "testuserthree";
    const email = "testuserthree@test.com";
    const password = "197328465";
    const age = 24;
    const gender = "Não Binário";
    const phone = "21977777777";
    const isAdm = false;

    const user_id = "8575e51f-2d48-4297-be3f-c59931638544";

    const toEdit = {
      name,
      userName,
      email,
      password,
      age,
      gender,
      phone,
      address: newAddress,
      club: newClub,
      partnership: newPartnership,
      isAdm,
    };

    const editedUser = await editOneUserService({ user_id, toEdit });

    expect(editedUser).toBeTruthy();
    expect(editedUser).toBeInstanceOf(User);
    expect(editedUser).toEqual(
      expect.objectContaining({
        id: "8575e51f-2d48-4297-be3f-c59931638544",
        name,
        userName,
        email,
        age,
        gender,
        phone,
        isAdm,
      })
    );
    expect(editedUser?.address).toBeInstanceOf(Address);
    expect(editedUser?.address).toEqual(expect.objectContaining(newAddress));
    expect(editedUser?.club).toBeInstanceOf(Club);
    expect(editedUser?.club).toEqual(expect.objectContaining(newClub));
    expect(editedUser?.partnership).toBeInstanceOf(Partnership);
    expect(editedUser?.partnership).toEqual(
      expect.objectContaining(newPartnership)
    );
  });

  it("Should be able to edit one User data by user email.", async () => {
    const newAddress = {
      zip_code: "93290280",
      street: "Rua Nelson de O. Mello",
      number_house: "25",
      complement: "Bairro Jardim Planalto",
      city: "Esteio",
      state: "RS",
      country: "Brasil",
    };

    const newClub = await clubs.findOneBy({ id: 2 });
    const newPartnership = await partnerships.findOneBy({ id: 2 });

    const name = "Test User Four";
    const userName = "testuserFour";
    const email = "testuserfour@test.com";
    const password = "123456789";
    const age = 28;
    const gender = "Feminino";
    const phone = "21988888888";
    const isAdm = true;

    const userEmail = emailTwo;

    const toEdit = {
      name,
      userName,
      email,
      password,
      age,
      gender,
      phone,
      address: newAddress,
      club: newClub!,
      partnership: newPartnership!,
      isAdm,
    };

    const editedUser = await editMeUserService({ userEmail, toEdit });

    expect(editedUser).toBeTruthy();
    expect(editedUser).toBeInstanceOf(User);
    expect(editedUser).toEqual(
      expect.objectContaining({
        id: "8575e51f-2d48-4297-be3f-c59931638545",
        name,
        userName,
        email,
        age,
        gender,
        phone,
        isAdm,
      })
    );
    expect(editedUser?.address).toBeInstanceOf(Address);
    expect(editedUser?.address).toEqual(expect.objectContaining(newAddress));
    expect(editedUser?.club).toBeInstanceOf(Club);
    expect(editedUser?.club).toEqual(expect.objectContaining(newClub));
    expect(editedUser?.partnership).toBeInstanceOf(Partnership);
    expect(editedUser?.partnership).toEqual(
      expect.objectContaining(newPartnership)
    );
  });

  it("Should be able to delete one User data by user id.", async () => {
    const deleted = await deleteOneUserService(
      "8575e51f-2d48-4297-be3f-c59931638544"
    );

    expect(deleted).toBe(true);
  });

  it("Should be able to delete one User data by user email.", async () => {
    const deleted = await deleteMeUserService("testuserfour@test.com");

    expect(deleted).toBe(true);
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

  it("Should throw errConflict for creating a repeated User.", async () => {
    const uuidSpy = jest.spyOn(uuid, "v4");

    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);

    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638544");
    await createUserService(userOne);

    try {
      uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638545");
      await createUserService(userOne);
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for creating an User with an unexisting Club.", async () => {
    const newPartnership = partnerships.create(partnership);

    await partnerships.save(newPartnership);

    try {
      await createUserService(userTwo);
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errNotFound for creating an User with an unexisting Partnership.", async () => {
    const newClub = clubs.create(club);

    await clubs.save(newClub);

    try {
      await createUserService(userTwo);
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errNotFound for listing an User with a wrong/unexisting id.", async () => {
    try {
      await listOneUserService("8575e51f-2d48-4297-be3f-c59931638544");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errNotFound for listing an User with a wrong/unexisting email.", async () => {
    try {
      await listMeUserService("testuserfour@test.com");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errNotFound for editing an User with a wrong/unexisting id.", async () => {
    const user_id = "8575e51f-2d48-4297-be3f-c59931638544";
    const toEdit = {};

    try {
      await editOneUserService({ user_id, toEdit });
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errConflict for editing an User by id with an existing name.", async () => {
    const uuidSpy = jest.spyOn(uuid, "v4");

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638544");
    const testUserOne = users.create(userOne);
    await users.save(testUserOne);

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638545");
    const testUserTwo = users.create(userTwo);
    await users.save(testUserTwo);

    const user_id = "8575e51f-2d48-4297-be3f-c59931638545";

    const toEdit = {
      name: nameOne,
    };

    try {
      await editOneUserService({ user_id, toEdit });
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errConflict for editing an User by id with an existing user name.", async () => {
    const uuidSpy = jest.spyOn(uuid, "v4");

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638544");
    const testUserOne = users.create(userOne);
    await users.save(testUserOne);

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638545");
    const testUserTwo = users.create(userTwo);
    await users.save(testUserTwo);

    const user_id = "8575e51f-2d48-4297-be3f-c59931638545";

    const toEdit = {
      userName: userNameOne,
    };

    try {
      await editOneUserService({ user_id, toEdit });
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errConflict for editing an User by id with an existing email.", async () => {
    const uuidSpy = jest.spyOn(uuid, "v4");

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638544");
    const testUserOne = users.create(userOne);
    await users.save(testUserOne);

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638545");
    const testUserTwo = users.create(userTwo);
    await users.save(testUserTwo);

    const user_id = "8575e51f-2d48-4297-be3f-c59931638545";

    const toEdit = {
      email: emailOne,
    };

    try {
      await editOneUserService({ user_id, toEdit });
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for editing an User with a wrong/unexisting email.", async () => {
    const userEmail = emailTwo;
    const toEdit = {};

    try {
      await editMeUserService({ userEmail, toEdit });
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errConflict for editing an User by email with an existing name.", async () => {
    const uuidSpy = jest.spyOn(uuid, "v4");

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638544");
    const testUserOne = users.create(userOne);
    await users.save(testUserOne);

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638545");
    const testUserTwo = users.create(userTwo);
    await users.save(testUserTwo);

    const userEmail = emailTwo;

    const toEdit = {
      name: nameOne,
    };

    try {
      await editMeUserService({ userEmail, toEdit });
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errConflict for editing an User by email with an existing user name.", async () => {
    const uuidSpy = jest.spyOn(uuid, "v4");

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638544");
    const testUserOne = users.create(userOne);
    await users.save(testUserOne);

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638545");
    const testUserTwo = users.create(userTwo);
    await users.save(testUserTwo);

    const userEmail = emailTwo;

    const toEdit = {
      userName: userNameOne,
    };

    try {
      await editMeUserService({ userEmail, toEdit });
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errConflict for editing an User by email with an existing email.", async () => {
    const uuidSpy = jest.spyOn(uuid, "v4");

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638544");
    const testUserOne = users.create(userOne);
    await users.save(testUserOne);

    uuidSpy.mockReturnValueOnce("8575e51f-2d48-4297-be3f-c59931638545");
    const testUserTwo = users.create(userTwo);
    await users.save(testUserTwo);

    const userEmail = emailTwo;

    const toEdit = {
      email: emailOne,
    };

    try {
      await editMeUserService({ userEmail, toEdit });
    } catch (e) {
      expect(e).toMatchObject(errConflict);
    }
  });

  it("Should throw errNotFound for deleting an User with a wrong/unexisting id.", async () => {
    try {
      await deleteOneUserService("8575e51f-2d48-4297-be3f-c59931638544");
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });

  it("Should throw errNotFound for deleting an User with a wrong/unexisting email.", async () => {
    try {
      await deleteMeUserService(emailTwo);
    } catch (e) {
      expect(e).toMatchObject(errNotFound);
    }
  });
});
