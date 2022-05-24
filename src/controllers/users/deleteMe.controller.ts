import { Request, Response } from "express";
import { deleteMeUserService } from "../../services";

const deleteMeUserController = async (req: Request, res: Response) => {
  const { userEmail } = req;

  await deleteMeUserService(userEmail);

  return res.status(204).json();
};

export default deleteMeUserController;
