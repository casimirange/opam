import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponLayoutComponent } from './coupon-layout.component';

describe('CouponLayoutComponent', () => {
  let component: CouponLayoutComponent;
  let fixture: ComponentFixture<CouponLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
