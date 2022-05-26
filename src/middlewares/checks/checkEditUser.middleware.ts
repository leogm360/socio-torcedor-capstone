import { Request, Response, NextFunction } from "express";
import { IEditUserSchema } from "../../interfaces/schemas";
import useRepo from "../../hooks/useRepo";
import { SchemaOf } from "yup";
import useError from "../../hooks/useError";

const checkEditUserMiddleware =
  (schema: SchemaOf<IEditUserSchema>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { clubs, partnerships } = useRepo();
    const { errNotFound } = useError();

    try {
      const data = req.body;
      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (validatedData.clubId) {
          const club = await clubs.findOneBy({ id: validatedData.clubId });

          if (!club) throw errNotFound;

          validatedData.club = club;
        }

        if (validatedData.partnershipId) {
          const partnership = await partnerships.findOneBy({
            id: validatedData.partnershipId,
          });

          if (!partnership) throw errNotFound;

          validatedData.partnership = partnership;
        }

        delete validatedData.clubId;
        delete validatedData.partnershipId;
        delete validatedData.checker;

        req.toEdit = validatedData;

        return next();
      } catch (e: any) {
        return res.status(400).json({ message: e.errors?.join(", ") });
      }
    } catch (e) {
      next(e);
    }
  };

export default checkEditUserMiddleware;
