import { Request, Response } from "express";
import "express-async-errors";

import clubListService from "../../services/club/list.service";

const clubListController = async (req: Request, res: Response) => {
  try {
    const listClubs = await clubListService();

    return res.status(200).send(listClubs);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};

export default clubListController;
