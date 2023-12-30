import { Request, Response } from "express";
import { listOneUserService } from "../../services";

const listOneUserController = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  const user = await listOneUserService(user_id);

  return res.status(200).json(user);
};

export default listOneUserController;
