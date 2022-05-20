export interface IClub {
  id: number;
  name: string;
}

export interface IClubCreate {
  name: string;
}

export interface IClubUpdate {
  club_id: string;
  name: string;
}
