import { Request, Response } from "express";
import listMeUserService from "../../services/users/listMe.service";

const listOneUserController = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  const user = await listMeUserService(user_id);

  return res.status(200).json(user);
};

export default listOneUserController;
