import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { TeamDto} from "../teams/model";
import {Observable} from "rxjs";
import {NewPlayerDto, PlayerDto, UpdatePlayerDto} from "./model";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private http: HttpClient
  ) { }
  addPlayer(newPlayer: NewPlayerDto): Observable<PlayerDto> {
    return this.http.post<PlayerDto>('http://localhost:4000/api/v1/players', newPlayer);
  }
  editPlayer(newPlayer: UpdatePlayerDto, idPlayer: string | undefined): Observable<PlayerDto> {
    return this.http.put<PlayerDto>(`http://localhost:4000/api/v1/players/${idPlayer}`, newPlayer);
  }
  getPlayers(): Observable<PlayerDto[]> {
    return this.http.get<PlayerDto[]>('http://localhost:4000/api/v1/players');
  }
  getTeamById(idTeam:string): Observable<TeamDto> {
    return this.http.get<TeamDto>(`http://localhost:4000/api/v1/teams/${idTeam}`);
  }

  getPlayer(idPlayer: string): Observable<PlayerDto> {
    return this.http.get<PlayerDto>(`http://localhost:4000/api/v1/players/${idPlayer}`);
  }
  deletePlayer(playerId: string) {
    return this.http.delete(`http://localhost:4000/api/v1/players/${playerId}`);
  }
}
