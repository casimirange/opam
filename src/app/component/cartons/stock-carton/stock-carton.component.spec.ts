import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCartonComponent } from './stock-carton.component';

describe('StockCartonComponent', () => {
  let component: StockCartonComponent;
  let fixture: ComponentFixture<StockCartonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockCartonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCartonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
