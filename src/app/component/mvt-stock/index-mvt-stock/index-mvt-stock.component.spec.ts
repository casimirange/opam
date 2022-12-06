import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexMvtStockComponent } from './index-mvt-stock.component';

describe('IndexMvtStockComponent', () => {
  let component: IndexMvtStockComponent;
  let fixture: ComponentFixture<IndexMvtStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexMvtStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexMvtStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
