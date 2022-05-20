import { Request, Response } from "express";
import createUserService from "../../services/users/create.service";

export const createUserController = async (req: Request, res: Response) => {
  const {
    name,
    user_name,
    email,
    password,
    age,
    phone,
    gender,
    is_adm = false,
    address,
    partnership_id,
    club_id,
  } = req.body;

  try {
    const user = await createUserService({
      name,
      user_name,
      email,
      password,
      age,
      gender,
      phone,
      address,
      club_id,
      partnership_id,
      is_adm,
    });

    return res.status(201).json(user);
  } catch (err: any) {
    const { statusCode, message } = err;
    return res.status(statusCode).send({ status: "err", statusCode, message });
  }
};
