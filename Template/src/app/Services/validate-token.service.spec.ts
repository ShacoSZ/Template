import { TestBed } from '@angular/core/testing';

import { ValidateTokenService } from './validate-token.service';

describe('ValidateTokenService', () => {
  let service: ValidateTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
