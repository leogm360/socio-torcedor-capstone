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
  user_name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  phone: string;
  address: IAdress;
  club_id: number;
  partnership_id: number;
  is_adm: boolean;
}
