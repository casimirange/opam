import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetLayoutComponent } from './carnet-layout.component';

describe('CarnetLayoutComponent', () => {
  let component: CarnetLayoutComponent;
  let fixture: ComponentFixture<CarnetLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnetLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
