import { Request, Response } from "express";
import editMeUserService from "../../services/users/editMe.service";

const editMeUserController = async (req: Request, res: Response) => {
  const { userEmail, toEdit } = req;

  const user = await editMeUserService({ userEmail, toEdit });

  return res.status(201).json(user);
};

export default editMeUserController;
