import { Request, Response } from "express";
import { listOneClubService } from "../../services";

const listOneClubController = async (req: Request, res: Response) => {
  const { club_id } = req.params;

  const club = await listOneClubService(club_id);

  return res.json(club);
};

export default listOneClubController;
