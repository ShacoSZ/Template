import { TestBed } from '@angular/core/testing';

import { UpCrGuardGuard } from './up-cr-guard.guard';

describe('UpCrGuardGuard', () => {
  let guard: UpCrGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UpCrGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
