export interface ICreatePartnership {
  name: string;
  price: number;
  rewards_id: [];
}

export interface IUpdatePartnership {
  id: string;
  name: string;
  price: number;
  reward_id?: [];
}
