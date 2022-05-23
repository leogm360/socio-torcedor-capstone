import { Request, Response } from "express";
import loginUserService from "../../services/users/login.service";

const loginUserController = async (req: Request, res: Response) => {
  const { email, userName, password } = req.body;

  const token = await loginUserService({ email, userName, password });

  return res.status(200).json({
    userToken: token,
  });
};

export default loginUserController;
