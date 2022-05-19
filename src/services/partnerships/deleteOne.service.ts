import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";

const partnershipDeleteOneService = async (id: string) => {
  const { partnerships } = useRepo();
  const { errNotFound } = useError();

  const listPartnerships = await partnerships.find();

  const account = listPartnerships.find(
    (partnership) => partnership.id.toString() === id
  );

  if (!account) throw errNotFound;

  await partnerships.delete(account!.id);

  return true;
};

export default partnershipDeleteOneService;
