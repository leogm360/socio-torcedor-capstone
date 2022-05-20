// import { Request, Response } from "express";

// export const editMeController = async (req: Request, res: Response) => {
//   const { authorization } = req.headers;

//   try {
//     const user = await editMeService({
//       authorization,
//     });

//     return res.status(201).json(user);
//   } catch (err: any) {
//     const { statusCode, message } = err;
//     return res.status(statusCode).send({ status: "err", statusCode, message });
//   }
// };
