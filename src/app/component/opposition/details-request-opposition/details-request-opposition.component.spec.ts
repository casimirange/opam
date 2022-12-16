import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRequestOppositionComponent } from './details-request-opposition.component';

describe('DetailsRequestOppositionComponent', () => {
  let component: DetailsRequestOppositionComponent;
  let fixture: ComponentFixture<DetailsRequestOppositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRequestOppositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRequestOppositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
