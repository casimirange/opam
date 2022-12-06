import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvtStockLayoutComponent } from './mvt-stock-layout.component';

describe('MvtStockLayoutComponent', () => {
  let component: MvtStockLayoutComponent;
  let fixture: ComponentFixture<MvtStockLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvtStockLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MvtStockLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
