// import { Request, Response } from "express";

// export const editOneController = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const user = await editOneService({ id });

//     return res.status(201).json(user);
//   } catch (err: any) {
//     const { statusCode, message } = err;
//     return res.status(statusCode).send({ status: "err", statusCode, message });
//   }
// };
