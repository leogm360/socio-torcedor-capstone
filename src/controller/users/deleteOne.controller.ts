import { Request, Response } from "express";

export const deleteOneController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteOneService({ id });

    return res.status(204).json({});
  } catch (err: any) {
    const { statusCode, message } = err;
    return res.status(statusCode).send({ status: "err", statusCode, message });
  }
};
