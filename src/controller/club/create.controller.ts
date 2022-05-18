import { Request, Response } from "express";
import "express-async-errors";

import clubCreateService from "../../services/club/create.service";

const clubCreateController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newClub = await clubCreateService({ name });

    return res.status(201).send(newClub);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};

export default clubCreateController;
