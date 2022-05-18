import { Request, Response } from "express";
import AppError from "../../errors";

export const createUserController = async (req: Request, res: Response) => {
  const {
    name,
    userName,
    email,
    password,
    age,
    phone,
    gender,
    isAdm = false,
    address_id,
    partnership_id,
    club_id,
  } = req.body;

  try {
    const user = await createUserService({
      name,
      userName,
      email,
      password,
      age,
      phone,
      gender,
      isAdm,
      address_id,
      partnership_id,
      club_id,
    });

    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(400, "");
    }
  }
};
