import { TestBed } from '@angular/core/testing';

import { PlayersFacadeService } from './players-facade.service';

describe('PlayersFacadeService', () => {
  let service: PlayersFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
