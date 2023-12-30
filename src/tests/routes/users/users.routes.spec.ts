import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import jwt from "jsonwebtoken";
import * as uuid from "uuid";
import app from "../../../app";
import useRepo from "../../../hooks/useRepo";
import useError from "../../../hooks/useError";

jest.mock("uuid");
const uuidSpy = jest.spyOn(uuid, "v4");

const { clubs, partnerships } = useRepo();

const { errNotFound, errConflict, errToken, errAccess } = useError();

const idOne = "8575e51f-2d48-4297-be3f-c59931638544";
const nameOne = "Test User One";
const userNameOne = "testusertone";
const emailOne = "testuserone@test.com";
const passwordOne = "123456789";
const ageOne = 20;
const genderOne = "Masculino";
const phoneOne = "21999999999";
const isAdmOne = true;

const idTwo = "8575e51f-2d48-4297-be3f-c59931638545";
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

let token = "";

describe("Integration User Routes on Success", () => {
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

  it("Should be able to create a User.", async () => {
    uuidSpy.mockReturnValueOnce(idOne);

    const response = await request(app).post("/users").send(userOne);

    const { statusCode, body } = response;

    expect(statusCode).toBe(201);
    expect(body).toEqual(
      expect.objectContaining({
        id: idOne,
        name: nameOne,
        userName: userNameOne,
        email: emailOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        isAdm: isAdmOne,
      })
    );
    expect(body.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(body.club).toEqual(expect.objectContaining(club));
    expect(body.partnership).toEqual(expect.objectContaining(partnership));
  });

  it("Should be able to login a User.", async () => {
    const response = await request(app).post("/users/login").send({
      email: emailOne,
      password: passwordOne,
    });

    const { statusCode, body } = response;

    const decoded: any = jwt.decode(body.userToken);

    expect(statusCode).toBe(200);
    expect(body.message).toBe("Authenticated.");
    expect(body.userToken).toBeTruthy();
    expect(decoded.userEmail).toBe(emailOne);

    token = body.userToken;
  });

  it("Should be able to list all Users.", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("map");
    expect(body[0]).toEqual(
      expect.objectContaining({
        id: idOne,
        name: nameOne,
        userName: userNameOne,
        email: emailOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        isAdm: isAdmOne,
      })
    );
    expect(body[0].address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(body[0].club).toEqual(expect.objectContaining(club));
    expect(body[0].partnership).toEqual(expect.objectContaining(partnership));
  });

  it("Should be able to list one User by user id.", async () => {
    const response = await request(app)
      .get(`/users/${idOne}`)
      .set("Authorization", `Bearer ${token}`);

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: idOne,
        name: nameOne,
        userName: userNameOne,
        email: emailOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        isAdm: isAdmOne,
      })
    );
    expect(body.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(body.club).toEqual(expect.objectContaining(club));
    expect(body.partnership).toEqual(expect.objectContaining(partnership));
  });

  it("Should be able to list one User by user email.", async () => {
    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: idOne,
        name: nameOne,
        userName: userNameOne,
        email: emailOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        isAdm: isAdmOne,
      })
    );
    expect(body.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(body.club).toEqual(expect.objectContaining(club));
    expect(body.partnership).toEqual(expect.objectContaining(partnership));
  });

  it("Should be able to edit one User by user id, not updating email.", async () => {
    const response = await request(app)
      .patch(`/users/${idOne}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: nameTwo,
        userName: userNameTwo,
        password: passwordTwo,
        age: ageTwo,
        gender: genderTwo,
        phone: phoneTwo,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmTwo,
      });

    const { statusCode, body } = response;

    expect(statusCode).toBe(201);
    expect(body).toBeTruthy();
    expect(body).toEqual(
      expect.objectContaining({
        id: idOne,
        name: nameTwo,
        userName: userNameTwo,
        email: emailOne,
        age: ageTwo,
        gender: genderTwo,
        phone: phoneTwo,
        isAdm: isAdmTwo,
      })
    );
    expect(body.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(body.club).toEqual(expect.objectContaining(club));
    expect(body.partnership).toEqual(expect.objectContaining(partnership));
  });

  it("Should be able to edit one User by user id, updating email.", async () => {
    const response = await request(app)
      .patch(`/users/${idOne}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: nameOne,
        userName: userNameOne,
        email: emailTwo,
        password: passwordOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmOne,
      });

    const {
      statusCode,
      body: { refreshedToken, updatedUser },
    } = response;

    const decoded: any = jwt.decode(refreshedToken);

    expect(statusCode).toBe(201);
    expect(decoded).toBeTruthy();
    expect(decoded.userEmail).toBe(emailTwo);
    expect(updatedUser).toBeTruthy();
    expect(updatedUser).toEqual(
      expect.objectContaining({
        id: idOne,
        name: nameOne,
        userName: userNameOne,
        email: emailTwo,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        isAdm: isAdmOne,
      })
    );
    expect(updatedUser.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(updatedUser.club).toEqual(expect.objectContaining(club));
    expect(updatedUser.partnership).toEqual(
      expect.objectContaining(partnership)
    );

    token = refreshedToken;
  });

  it("Should be able to edit one User by user token, not updating email.", async () => {
    const response = await request(app)
      .patch("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: nameTwo,
        userName: userNameTwo,
        password: passwordTwo,
        age: ageTwo,
        gender: genderTwo,
        phone: phoneTwo,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmTwo,
      });

    const { statusCode, body } = response;

    expect(statusCode).toBe(201);
    expect(body).toBeTruthy();
    expect(body).toEqual(
      expect.objectContaining({
        id: idOne,
        name: nameTwo,
        userName: userNameTwo,
        email: emailTwo,
        age: ageTwo,
        gender: genderTwo,
        phone: phoneTwo,
        isAdm: isAdmTwo,
      })
    );
    expect(body.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(body.club).toEqual(expect.objectContaining(club));
    expect(body.partnership).toEqual(expect.objectContaining(partnership));
  });

  it("Should be able to edit one User by user token, updating email.", async () => {
    const response = await request(app)
      .patch(`/users/${idOne}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
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
      });

    const {
      statusCode,
      body: { refreshedToken, updatedUser },
    } = response;

    const decoded: any = jwt.decode(refreshedToken);

    expect(statusCode).toBe(201);
    expect(decoded).toBeTruthy();
    expect(decoded.userEmail).toBe(emailOne);
    expect(updatedUser).toBeTruthy();
    expect(updatedUser).toEqual(
      expect.objectContaining({
        id: idOne,
        name: nameOne,
        userName: userNameOne,
        email: emailOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        isAdm: isAdmOne,
      })
    );
    expect(updatedUser.address).toEqual(
      expect.objectContaining({ ...address, complement: null })
    );
    expect(updatedUser.club).toEqual(expect.objectContaining(club));
    expect(updatedUser.partnership).toEqual(
      expect.objectContaining(partnership)
    );

    token = refreshedToken;
  });

  it("Should be able to delete one User by user id.", async () => {
    const response = await request(app)
      .delete(`/users/${idOne}`)
      .set("Authorization", `Bearer ${token}`);

    const { statusCode, body } = response;

    expect(statusCode).toBe(204);
    expect(Object.keys(body).length).toBe(0);
  });

  it("Should be able to delete one User by user email.", async () => {
    uuidSpy.mockReturnValueOnce(idTwo);

    await request(app).post("/users").send(userTwo);

    const login = await request(app)
      .post("/users/login")
      .send({ email: emailTwo, password: passwordTwo });

    const {
      body: { userToken },
    } = login;

    token = userToken;

    const response = await request(app)
      .delete("/users/me")
      .set("Authorization", `Bearer ${token}`);

    const { statusCode, body } = response;

    expect(statusCode).toBe(204);
    expect(Object.keys(body).length).toBe(0);
  });
});

describe("Integration User Routes on Fail", () => {
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

  it("Should respond matching errConflict when creating a repeated User.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    uuidSpy.mockReturnValueOnce(idOne);
    const response = await request(app).post("/users").send(userOne);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(409);
    expect(message).toEqual(errConflict.message);
  });

  it("Should respond matching errNotFound when creating an User with unexisting Club.", async () => {
    const newPartnership = partnerships.create(partnership);

    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    const response = await request(app).post("/users").send(userOne);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(404);
    expect(message).toBe(errNotFound.message);
  });

  it("Should respond matching errNotFound when creating an User with unexisting Partnership.", async () => {
    const newClub = clubs.create(club);

    await clubs.save(newClub);

    uuidSpy.mockReturnValueOnce(idOne);
    const response = await request(app).post("/users").send(userOne);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(404);
    expect(message).toEqual(errNotFound.message);
  });

  it("Should respond matching errNotFound when loging an unexisting User.", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({ email: emailOne, password: passwordOne });

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(404);
    expect(message).toEqual(errNotFound.message);
  });

  it("Should respond matching errAccess when loging with invalid password User.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    const response = await request(app)
      .post("/users/login")
      .send({ email: emailOne, password: passwordTwo });

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(401);
    expect(message).toEqual(errAccess.message);
  });

  it("Should respond matching errNotFound when listing an User with a wrong/unexisting id.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    const login = await request(app)
      .post("/users/login")
      .send({ email: emailOne, password: passwordOne });

    const {
      body: { userToken },
    } = login;

    const response = await request(app)
      .get(`/users/${idTwo}`)
      .set("Authorization", `Bearer ${userToken}`);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(404);
    expect(message).toEqual(errNotFound.message);
  });

  it("Should respond matching errToken when listing an User with a wrong/unexisting token.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    const response = await request(app)
      .get("/users/me")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      );

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(401);
    expect(message).toEqual(errToken.message);
  });

  it("Should respond matching errNotFound when editing an User with a wrong/unexisting id.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    const login = await request(app)
      .post("/users/login")
      .send({ email: emailOne, password: passwordOne });

    const {
      body: { userToken },
    } = login;

    const response = await request(app)
      .patch(`/users/${idTwo}`)
      .send({
        name: nameTwo,
        userName: userNameTwo,
        password: passwordTwo,
        age: ageTwo,
        gender: genderTwo,
        phone: phoneTwo,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmTwo,
      })
      .set("Authorization", `Bearer ${userToken}`);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(404);
    expect(message).toEqual(errNotFound.message);
  });

  it("Should respond matching errConflict when editing by id an User with an existting name.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    uuidSpy.mockReturnValueOnce(idTwo);
    await request(app).post("/users").send(userTwo);

    const login = await request(app)
      .post("/users/login")
      .send({ email: emailTwo, password: passwordTwo });

    const {
      body: { userToken },
    } = login;

    const response = await request(app)
      .patch(`/users/${idTwo}`)
      .send({
        name: nameOne,
        password: passwordOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmOne,
      })
      .set("Authorization", `Bearer ${userToken}`);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(409);
    expect(message).toEqual(errConflict.message);
  });

  it("Should respond matching errConflict when editing by id an User with an existting user name.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    uuidSpy.mockReturnValueOnce(idTwo);
    await request(app).post("/users").send(userTwo);

    const login = await request(app)
      .post("/users/login")
      .send({ email: emailTwo, password: passwordTwo });

    const {
      body: { userToken },
    } = login;

    const response = await request(app)
      .patch(`/users/${idTwo}`)
      .send({
        userName: userNameOne,
        password: passwordOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmOne,
      })
      .set("Authorization", `Bearer ${userToken}`);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(409);
    expect(message).toEqual(errConflict.message);
  });

  it("Should respond matching errConflict when editing by id an User with an existting email.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    uuidSpy.mockReturnValueOnce(idTwo);
    await request(app).post("/users").send(userTwo);

    const login = await request(app)
      .post("/users/login")
      .send({ email: emailTwo, password: passwordTwo });

    const {
      body: { userToken },
    } = login;

    const response = await request(app)
      .patch(`/users/${idTwo}`)
      .send({
        email: emailOne,
        password: passwordOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmOne,
      })
      .set("Authorization", `Bearer ${userToken}`);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(409);
    expect(message).toEqual(errConflict.message);
  });

  it("Should respond matching errToken when editing an User with a wrong/unexisting token.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    const response = await request(app)
      .patch("/users/me")
      .send({
        name: nameTwo,
        userName: userNameTwo,
        password: passwordTwo,
        age: ageTwo,
        gender: genderTwo,
        phone: phoneTwo,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmTwo,
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      );

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(401);
    expect(message).toEqual(errToken.message);
  });

  it("Should respond matching errConflict when editing by token an User with an existting name.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    uuidSpy.mockReturnValueOnce(idTwo);
    await request(app).post("/users").send(userTwo);

    const login = await request(app)
      .post("/users/login")
      .send({ email: emailTwo, password: passwordTwo });

    const {
      body: { userToken },
    } = login;

    const response = await request(app)
      .patch("/users/me")
      .send({
        name: nameOne,
        password: passwordOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmOne,
      })
      .set("Authorization", `Bearer ${userToken}`);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(409);
    expect(message).toEqual(errConflict.message);
  });

  it("Should respond matching errConflict when editing by token an User with an existting user name.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    uuidSpy.mockReturnValueOnce(idTwo);
    await request(app).post("/users").send(userTwo);

    const login = await request(app)
      .post("/users/login")
      .send({ email: emailTwo, password: passwordTwo });

    const {
      body: { userToken },
    } = login;

    const response = await request(app)
      .patch("/users/me")
      .send({
        userName: userNameOne,
        password: passwordOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmOne,
      })
      .set("Authorization", `Bearer ${userToken}`);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(409);
    expect(message).toEqual(errConflict.message);
  });

  it("Should respond matching errConflict when editing by token an User with an existting email.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    uuidSpy.mockReturnValueOnce(idTwo);
    await request(app).post("/users").send(userTwo);

    const login = await request(app)
      .post("/users/login")
      .send({ email: emailTwo, password: passwordTwo });

    const {
      body: { userToken },
    } = login;

    const response = await request(app)
      .patch("/users/me")
      .send({
        email: emailOne,
        password: passwordOne,
        age: ageOne,
        gender: genderOne,
        phone: phoneOne,
        address: address,
        clubId: 1,
        partnershipId: 1,
        isAdm: isAdmOne,
      })
      .set("Authorization", `Bearer ${userToken}`);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(409);
    expect(message).toEqual(errConflict.message);
  });

  it("Should respond matching errNotFound for deleting an User with a wrong/unexisting id.", async () => {
    const newClub = clubs.create(club);
    const newPartnership = partnerships.create(partnership);

    await clubs.save(newClub);
    await partnerships.save(newPartnership);

    uuidSpy.mockReturnValueOnce(idOne);
    await request(app).post("/users").send(userOne);

    const login = await request(app)
      .post("/users/login")
      .send({ email: emailOne, password: passwordOne });

    const {
      body: { userToken },
    } = login;

    const response = await request(app)
      .delete(`/users/${idTwo}`)
      .set("Authorization", `Bearer ${userToken}`);

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(404);
    expect(message).toEqual(errNotFound.message);
  });

  it("Should throw errAccess for deleting an User with a wrong/unexisting token.", async () => {
    const response = await request(app)
      .delete("/users/me")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      );

    const {
      statusCode,
      body: { message },
    } = response;

    expect(statusCode).toBe(401);
    expect(message).toEqual(errToken.message);
  });
});
