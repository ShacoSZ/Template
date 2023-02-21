import { TestBed } from '@angular/core/testing';

import { SalirService } from './salir.service';

describe('SalirService', () => {
  let service: SalirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
