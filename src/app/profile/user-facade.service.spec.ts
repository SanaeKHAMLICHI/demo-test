import { TestBed } from '@angular/core/testing';

import { UserFacadeService } from './user-facade.service';

describe('ProfileFacadeService', () => {
  let service: UserFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
