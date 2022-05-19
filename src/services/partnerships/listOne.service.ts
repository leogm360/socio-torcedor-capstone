import useError from "../../hooks/useError";
import useRepo from "../../hooks/useRepo";

const partnershipListOneService = async (id: string) => {
  const { partnerships } = useRepo();
  const { errNotFound } = useError();

  const listPartnerships = await partnerships.find();

  const partnership = listPartnerships.find(
    (partnership) => partnership.id.toString() === id
  );

  if (!partnership) throw errNotFound;

  return partnership;
};

export default partnershipListOneService;
