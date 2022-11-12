import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfererCarnetComponent } from './transferer-carnet.component';

describe('TransfererCarnetComponent', () => {
  let component: TransfererCarnetComponent;
  let fixture: ComponentFixture<TransfererCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfererCarnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfererCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
