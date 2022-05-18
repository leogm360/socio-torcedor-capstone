import { Request, Response } from "express";
import "express-async-errors";

import clubUpdateOneService from "../../services/club/updateOne.service";

const clubUpdateController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const club = await clubUpdateOneService(name);

    return res.status(201).send(club);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};
