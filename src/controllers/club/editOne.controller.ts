import { Request, Response } from "express";
import { editOneClubService } from "../../services";

const editOneClubController = async (req: Request, res: Response) => {
  const {
    body: { name },
    params: { club_id },
  } = req;

  const club = await editOneClubService({ club_id, name });

  return res.status(201).json(club);
};

export default editOneClubController;
