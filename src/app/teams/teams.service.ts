// group.service.ts
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NewTeamDto, TeamDto, UpdateTeamDto} from "./model";
import {GroupDto, NewGroupDto} from "../group/model";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  constructor(
    private http: HttpClient
  ) {
  }
  addTeam(newTeam: NewTeamDto): Observable<TeamDto> {
    return this.http.post<TeamDto>('http://localhost:4000/api/v1/teams', newTeam);
  }
  editTeam(newTeam: UpdateTeamDto, idTeam: string | undefined): Observable<TeamDto> {
    return this.http.put<TeamDto>(`http://localhost:4000/api/v1/teams/${idTeam}`, newTeam);
  }
  getTeams(): Observable<TeamDto[]> {
    return this.http.get<TeamDto[]>('http://localhost:4000/api/v1/teams');
  }
  getGroup(idGroup:string): Observable<GroupDto[]> {
    return this.http.get<GroupDto[]>(`http://localhost:4000/api/v1/groups/${idGroup}`);
  }
  getGroupById(idGroup:string): Observable<GroupDto> {
    return this.http.get<GroupDto>(`http://localhost:4000/api/v1/groups/${idGroup}`);
  }
  getTeam(idTeam: string): Observable<TeamDto> {
    return this.http.get<TeamDto>(`http://localhost:4000/api/v1/teams/${idTeam}`);
  }
  editGroup(newGroup: NewGroupDto, idGroup: string | undefined): Observable<TeamDto> {
    return this.http.put<TeamDto>(`http://localhost:4000/api/v1/groups/${idGroup}`, newGroup);
  }
  deleteTeam(teamId: string) {
    return this.http.delete(`http://localhost:4000/api/v1/teams/${teamId}`);
  }
}
