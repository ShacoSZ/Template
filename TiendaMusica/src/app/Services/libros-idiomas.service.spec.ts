import { TestBed } from '@angular/core/testing';

import { LibrosIdiomasService } from './libros-idiomas.service';

describe('LibrosIdiomasService', () => {
  let service: LibrosIdiomasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrosIdiomasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
