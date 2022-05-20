// import { Request, Response } from "express";

// export const listOneController = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const user = await userListOneService({ id });

//     return res.status(200).json(user);
//   } catch (err: any) {
//     const { statusCode, message } = err;
//     return res.status(statusCode).send({ status: "err", statusCode, message });
//   }
// };
