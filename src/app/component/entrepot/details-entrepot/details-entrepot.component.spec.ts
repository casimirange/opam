import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEntrepotComponent } from './details-entrepot.component';

describe('DetailsEntrepotComponent', () => {
  let component: DetailsEntrepotComponent;
  let fixture: ComponentFixture<DetailsEntrepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsEntrepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEntrepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
