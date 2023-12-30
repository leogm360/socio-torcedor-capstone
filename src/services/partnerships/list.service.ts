import useRepo from "../../hooks/useRepo";

const listPartinershipsService = async () => {
  const { partnerships } = useRepo();

  const listPartnerships = await partnerships.find();

  return listPartnerships;
};

export default listPartinershipsService;
