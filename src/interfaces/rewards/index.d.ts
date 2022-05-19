export interface IReward {
  id: number;
  name: string;
}

export interface IRewardCreate {
  name: string;
  description: string;
}

export interface IRewardUpdate {
  reward_id: string;
  name: string;
  description: string;
}
