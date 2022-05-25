import { Request, Response } from "express";
import { listPartinershipsService } from "../../services";

const listPartinershipsController = async (req: Request, res: Response) => {
  const partnership = await listPartinershipsService();

  return res.json(partnership);
};

export default listPartinershipsController;
