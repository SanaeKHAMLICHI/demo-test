// group.service.ts
import { Injectable } from '@angular/core';
import { Team} from "./group";
import {GroupDto} from "../group/model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl = "https://cdn.countryflags.com/thumbs/";

  private groups: GroupDto[] = [
  ];

    getGroups(): GroupDto[] {
    return this.groups;
  }
  getGroupById(groupId: number): GroupDto | undefined {
    // @ts-ignore
    return this.groups.find(group => group._id === groupId);
  }
}
