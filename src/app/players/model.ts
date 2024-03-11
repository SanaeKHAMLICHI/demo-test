import {TeamDto} from "../teams/model";

export interface PlayerDto {
  _id: string;
  libelle: string;
  poste:string;
  clubName:string;
  team:TeamDto;
}
export interface NewPlayerDto {
  libelle: string;
  poste:string;
  clubName:string;
  team: {};
}
export interface UpdatePlayerDto {
  libelle: string;
  poste:string;
  clubName:string;
  team: {};
}
