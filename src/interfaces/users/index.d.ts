interface IAdress {
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
  address: IAdress;
  clubId: number;
  partnershipId: number;
  isAdm: boolean;
}

export interface ILoginUser {
  email: string;
  userName: string;
  password: string;
}

export interface IEditUserProps {
  name?: string;
  user_name?: string;
  email?: string;
  password?: string;
  age?: number;
  gender?: string;
  phone?: string;
  address?: IAdress;
  club_id?: number;
  partnership_id?: number;
  is_adm?: boolean;
}

export interface IEditUserOne {
  user_id: string;
  toEdit: IEditUserProps;
}

export interface IEditUserMe {
  userEmail: string;
  toEdit: IEditUserProps;
}
