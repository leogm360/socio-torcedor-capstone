import useRepo from "../../hooks/useRepo";

const partinershipsListService = async () => {
  const { partnerships } = useRepo();

  const listPartnerships = await partnerships.find();

  return listPartnerships;
};

export default partinershipsListService;
