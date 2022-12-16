import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCreditNoteComponent } from './index-credit-note.component';

describe('IndexCreditNoteComponent', () => {
  let component: IndexCreditNoteComponent;
  let fixture: ComponentFixture<IndexCreditNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCreditNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
