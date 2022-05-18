import { Request, Response } from "express";
import "express-async-errors";

import clubDeleteOneService from "../../services/club/deleteOne.service";

const clubDeleteOneController = async (req: Request, res: Response) => {
  try {
    const { club_id } = req.params;

    const club = await clubDeleteOneService(club_id);

    return res.status(204);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};
