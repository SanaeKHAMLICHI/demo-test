import { Injectable } from '@angular/core';
import {TeamsService} from "./teams.service";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, map, Observable} from "rxjs";
import {GroupDto} from "../group/model";
import {TeamDto} from "./model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TeamsFacadeService {
  constructor(private teamService: TeamsService, private formBuilder :FormBuilder) {}
  teamForm(team?: TeamDto): FormGroup {
    return this.formBuilder.group({
      libelle: [team?.libelle ?? '', Validators.required],
      flagUrl: [team?.flagUrl ?? '', Validators.required],
      group: [team?.group?._id ?? '', Validators.required],

    });
  }
  groupForm(group?: GroupDto): FormGroup {
    return this.formBuilder.group({
      libelle: [group?.libelle ?? '', Validators.required],
    });
  }

  getGroup(groupId: string): Observable<GroupDto[]> {
    // @ts-ignore
    return this.teamService.getGroup().pipe(
      map(groups => groups.filter(group=> group._id === groupId))
    );
  }
  getGroupById(groupId: string): Observable<GroupDto> {
    // @ts-ignore
    return this.teamService.getGroupById(groupId);
  }


  getTeams(groupId: string): Observable<TeamDto[]> {
    return this.teamService.getTeams().pipe(
      map(teams => teams.filter(team => team.group?._id === groupId))
    );
  }

  getTeam(teamId: string ): Observable<TeamDto> {
    return this.teamService.getTeam(teamId)
  }

  addTeam(team: TeamDto): Observable<TeamDto> {
    return this.teamService.addTeam(team);
  }

  editTeam(team: TeamDto, teamId: string | undefined): Observable<TeamDto> {
    return this.teamService.editTeam(team, teamId);
  }

  editGroup(group: GroupDto, groupId: string | undefined): Observable<TeamDto> {
    return this.teamService.editGroup(group, groupId);
  }
  deleteTeam(teamId :string){
    return this.teamService.deleteTeam(teamId)
  }
}
