import { Club, Partnership } from "../../entities";

export interface IAddress {
  zip_code: string;
  street: string;
  number_house: string;
  complement: string | undefined;
  city: string;
  state: string;
  country: string;
}

export interface ICreateUser {
  name: string;
  userName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  phone: string;
  address: IAddress;
  clubId: number;
  partnershipId: number;
  isAdm: boolean;
}

export interface ILoginUser {
  email?: string;
  userName?: string;
  password: string;
}

interface IEditUserProps {
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
  age?: number;
  gender?: string;
  phone?: string;
  address?: IAddress;
  club?: Club;
  partnership?: Partnership;
  isAdm?: boolean;
}

export interface IEditUserOne {
  user_id: string;
  toEdit: IEditUserProps;
}

export interface IEditUserMe {
  userEmail: string;
  toEdit: IEditUserProps;
}
