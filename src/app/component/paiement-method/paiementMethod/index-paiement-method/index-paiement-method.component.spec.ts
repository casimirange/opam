import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPaiementMethodComponent } from './index-paiement-method.component';

describe('IndexPaiementMethodComponent', () => {
  let component: IndexPaiementMethodComponent;
  let fixture: ComponentFixture<IndexPaiementMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPaiementMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPaiementMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
