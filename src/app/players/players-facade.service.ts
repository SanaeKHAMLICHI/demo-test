import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayersService} from "./players.service";
import {TeamDto} from "../teams/model";
import {NewPlayerDto, PlayerDto} from "./model";
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PlayersFacadeService {

  constructor(private playersService: PlayersService, private formBuilder :FormBuilder) {}

  playerForm(player?: PlayerDto): FormGroup {
    return this.formBuilder.group({
      libelle: [player?.libelle ?? '', Validators.required],
      poste: [player?.poste ?? '', Validators.required],
      clubName: [player?.clubName ?? '', Validators.required],
      team: [player?.team?._id ?? '', Validators.required],
      group: [player?.team?.group?._id ?? '', Validators.required],

    });
  }
  getTeam(teamId: string): Observable<TeamDto> {
    return this.playersService.getTeamById(teamId);
  }

  getPlayers(teamId: string): Observable<PlayerDto[]> {
    return this.playersService.getPlayers().pipe(
      map(players => players.filter(player => player.team?._id === teamId))
    );
  }

  getPlayer(playerId: string  ): Observable<PlayerDto> {
    return this.playersService.getPlayer(playerId)
  }

  addPlayer(player: NewPlayerDto): Observable<PlayerDto> {
    return this.playersService.addPlayer(player);
  }

  editPlayer(player: PlayerDto, playerId: string): Observable<PlayerDto> {
    return this.playersService.editPlayer(player, playerId);
  }
  deletePlayer(playerId :string){
    return this.playersService.deletePlayer(playerId)
  }
}
