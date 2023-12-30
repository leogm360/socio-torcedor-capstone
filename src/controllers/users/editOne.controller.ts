import { Request, Response } from "express";
import { editOneUserService } from "../../services";

const editOneUserController = async (req: Request, res: Response) => {
  const {
    params: { user_id },
    toEdit,
  } = req;

  const user = await editOneUserService({ user_id, toEdit });

  return res.status(201).json(user);
};

export default editOneUserController;
