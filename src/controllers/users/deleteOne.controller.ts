import { Request, Response } from "express";
import deleteOneUserService from "../../services/users/deleteOne.service";

const deleteOneUserController = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  await deleteOneUserService(user_id);

  return res.status(204).json();
};

export default deleteOneUserController;
