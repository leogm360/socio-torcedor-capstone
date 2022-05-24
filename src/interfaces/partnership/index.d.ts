export interface ICreatePartnership {
  name: string;
  price: number;
  rewards_id: [];
}

export interface IUpdatePartnership {
  partnership_id: string;
  name: string;
  price: number;
  rewards_id: [];
}

export interface IUpdatePartnershipSchema {
  name?: string;
  price?: string;
  rewards_id?: array;
}
