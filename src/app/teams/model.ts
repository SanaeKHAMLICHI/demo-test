import {GroupDto} from "../group/model";

export interface TeamDto {
  _id: string;
  libelle: string;
  flagUrl:string;
  group:GroupDto;
}
export interface NewTeamDto {
  libelle: string;
  flagUrl:string;
  group:{};
}
export interface UpdateTeamDto {
  libelle: string;
  flagUrl:string;
  group:{};
}
