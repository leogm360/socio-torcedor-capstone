import { Request, Response } from "express";
import { createClubService } from "../../services";

const createClubController = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newClub = await createClubService({ name });

  return res.status(201).send(newClub);
};

export default createClubController;
