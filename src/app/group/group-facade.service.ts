import { Injectable } from '@angular/core';
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
