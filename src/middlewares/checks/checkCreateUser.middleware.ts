import { Request, Response, NextFunction } from "express";
import { ICreateUser } from "../../interfaces/users";
import { SchemaOf } from "yup";

const checkCreateUserMiddleware =
  (schema: SchemaOf<ICreateUser>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newUser = validatedData;

        return next();
      } catch (e: any) {
        return res.status(400).json({ message: e.errors?.join(", ") });
      }
    } catch (e) {
      next(e);
    }
  };

export default checkCreateUserMiddleware;
