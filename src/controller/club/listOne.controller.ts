import { Request, Response } from "express";
import "express-async-errors";

import clubListOneService from "../../services/club/listOne.service";

const clubListOneController = async (req: Request, res: Response) => {
  try {
    const { club_id } = req.params;

    const club = await clubListOneService(club_id);

    return res.status(200).send(club);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};

export default clubListOneController;
