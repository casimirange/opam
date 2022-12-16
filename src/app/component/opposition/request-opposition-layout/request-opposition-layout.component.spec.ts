import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOppositionLayoutComponent } from './request-opposition-layout.component';

describe('RequestOppositionLayoutComponent', () => {
  let component: RequestOppositionLayoutComponent;
  let fixture: ComponentFixture<RequestOppositionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestOppositionLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOppositionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
