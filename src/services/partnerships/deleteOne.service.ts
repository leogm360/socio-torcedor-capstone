import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";

const partnershipDeleteOneService = async (partnership_id: String) => {
  const { partnerships } = useRepo();
  const { errNotFound } = useError();

  const listPartnerships = await partnerships.find();

  const partnership = listPartnerships.find(
    (partnership) => partnership.id.toString() === partnership_id
  );

  if (!partnership) throw errNotFound;

  await partnerships.delete(partnership!.id);

  return true;
};

export default partnershipDeleteOneService;
