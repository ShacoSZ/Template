import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomaGuestComponent } from './idioma-guest.component';

describe('IdiomaGuestComponent', () => {
  let component: IdiomaGuestComponent;
  let fixture: ComponentFixture<IdiomaGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdiomaGuestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdiomaGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
