import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartonLayoutComponent } from './carton-layout.component';

describe('CartonLayoutComponent', () => {
  let component: CartonLayoutComponent;
  let fixture: ComponentFixture<CartonLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartonLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartonLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
