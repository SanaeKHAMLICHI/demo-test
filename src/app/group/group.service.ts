import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GroupDto} from "./model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }
  addGroup(libelleGroup: string): Observable<GroupDto> {
    return this.http.post<GroupDto>('http://localhost:4000/api/v1/groups', { libelle: libelleGroup });
  }
  getGroups(): Observable<GroupDto[]> {
    return this.http.get<GroupDto[]>('http://localhost:4000/api/v1/groups');
  }
  deleteGroup(groupId:string){
    return this.http.delete(`http://localhost:4000/api/v1/groups/${groupId}`);
  }
}
