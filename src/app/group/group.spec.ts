import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GroupService } from './group.service';
import {GroupDto} from "./model";

import { TestBed } from '@angular/core/testing';


describe('GroupService', () => {
  let service: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], });
    service = TestBed.inject(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a method that returns an array of groups', () => {
    const responseGroups = [
      { _id: "1", libelle: "Group 1" },
      { _id: "2", libelle: "Group 2" }
    ]
    service.getGroups().subscribe((groups) => {
      expect(groups).toEqual(responseGroups);
    })
  });


});
