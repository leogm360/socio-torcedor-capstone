import { Request, Response } from "express";
import listMeUserService from "../../services/users/listMe.service";

const listMeUserController = async (req: Request, res: Response) => {
  const { userEmail } = req;

  const user = await listMeUserService(userEmail);

  return res.status(200).json(user);
};

export default listMeUserController;
