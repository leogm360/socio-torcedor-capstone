// import { Request, Response } from "express";

// export const deleteMeController = async (req: Request, res: Response) => {
//   const { authorization } = req.headers;

//   try {
//     await deleteMeService({
//       authorization,
//     });

//     return res.status(204).json({});
//   } catch (err: any) {
//     const { statusCode, message } = err;
//     return res.status(statusCode).send({ status: "err", statusCode, message });
//   }
// };
