import { Request, Response } from "express";
import listUsersService from "../../services/users/list.service";

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.status(200).json(users);
};

export default listUsersController;
