import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  const { user_name, email, password } = req.body;

  try {
    const user = await userLoginService({ user_name, email, password });

    return res.status(200).json(user);
  } catch (err: any) {
    const { statusCode, message } = err;
    return res.status(statusCode).send({ status: "err", statusCode, message });
  }
};
