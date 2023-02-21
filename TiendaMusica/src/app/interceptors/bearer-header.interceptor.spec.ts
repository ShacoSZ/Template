import { TestBed } from '@angular/core/testing';

import { BearerHeaderInterceptor } from './bearer-header.interceptor';

describe('BearerHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BearerHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BearerHeaderInterceptor = TestBed.inject(BearerHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
