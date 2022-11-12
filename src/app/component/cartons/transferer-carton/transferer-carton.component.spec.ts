import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfererCartonComponent } from './transferer-carton.component';

describe('TransfererCartonComponent', () => {
  let component: TransfererCartonComponent;
  let fixture: ComponentFixture<TransfererCartonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfererCartonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfererCartonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
