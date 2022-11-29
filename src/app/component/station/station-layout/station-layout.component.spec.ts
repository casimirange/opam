import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationLayoutComponent } from './station-layout.component';

describe('StationLayoutComponent', () => {
  let component: StationLayoutComponent;
  let fixture: ComponentFixture<StationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
