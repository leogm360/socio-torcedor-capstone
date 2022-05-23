import { Request, Response } from "express";
import editOneUserService from "../../services/users/editOne.service";

const editOneUserController = async (req: Request, res: Response) => {
  const {
    params: { user_id },
    toUpdate,
  } = req;

  const user = await editOneUserService({ user_id, toUpdate });

  return res.status(201).json(user);
};

export default editOneUserController;
