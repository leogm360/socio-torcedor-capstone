import { Request, Response } from "express";
import { listClubsService } from "../../services";

const listClubsController = async (req: Request, res: Response) => {
  const listClubs = await listClubsService();

  return res.json(listClubs);
};

export default listClubsController;
