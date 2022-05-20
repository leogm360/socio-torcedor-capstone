import { Request, Response } from "express";

import clubUpdateOneService from "../../services/club/updateOne.service";

const clubUpdateOneController = async (req: Request, res: Response) => {
  try {
    const { club_id } = req.params;
    const { name } = req.body;

    const club = await clubUpdateOneService({ club_id, name });

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

export default clubUpdateOneController;
