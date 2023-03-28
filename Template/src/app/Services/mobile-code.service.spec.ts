import { TestBed } from '@angular/core/testing';

import { MobileCodeService } from './mobile-code.service';

describe('MobileCodeService', () => {
  let service: MobileCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
