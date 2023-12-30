import { AppDataSource } from "../data-source";
import { User, Address, Club, Partnership, Reward } from "../entities";

const useRepo = () => ({
  users: AppDataSource.getRepository(User),
  addresses: AppDataSource.getRepository(Address),
  clubs: AppDataSource.getRepository(Club),
  partnerships: AppDataSource.getRepository(Partnership),
  rewards: AppDataSource.getRepository(Reward),
});

export default useRepo;
