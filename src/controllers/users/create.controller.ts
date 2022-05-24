import { Request, Response } from "express";
import { createUserService } from "../../services";

const createUserController = async (req: Request, res: Response) => {
  const {
    name,
    userName,
    email,
    password,
    age,
    phone,
    gender,
    isAdm,
    address,
    partnershipId,
    clubId,
  } = req.newUser;

  console.log(req);

  const user = await createUserService({
    name,
    userName,
    email,
    password,
    age,
    gender,
    phone,
    address,
    isAdm,
    partnershipId,
    clubId,
  });

  return res.status(201).json(user);
};

export default createUserController;
