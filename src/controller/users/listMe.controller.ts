import { Request, Response } from "express";

export const listMeController = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  try {
    const user = await userListMeService({
      authorization,
    });

    return res.status(200).json(user);
  } catch (err: any) {
    const { statusCode, message } = err;
    return res.status(statusCode).send({ status: "err", statusCode, message });
  }
};
