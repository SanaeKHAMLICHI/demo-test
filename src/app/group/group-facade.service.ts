import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupDto} from "./model";
import {GroupService} from "./group.service";

@Injectable({
  providedIn: 'root'
})
export class GroupFacadeService {

  constructor(private homeService :GroupService) { }
  getGroups(){
    return this.homeService.getGroups()
  }
  deleteGroup(groupId:string){
    return this.homeService.deleteGroup(groupId)
  }
}
