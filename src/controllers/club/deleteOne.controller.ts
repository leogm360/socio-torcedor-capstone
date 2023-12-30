import { Request, Response } from "express";
import { deleteOneClubService } from "../../services";

const deleteOneClubController = async (req: Request, res: Response) => {
  const { club_id } = req.params;

  await deleteOneClubService(club_id);

  return res.status(204).json();
};

export default deleteOneClubController;
