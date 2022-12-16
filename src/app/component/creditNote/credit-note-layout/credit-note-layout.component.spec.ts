import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteLayoutComponent } from './credit-note-layout.component';

describe('CreditNoteLayoutComponent', () => {
  let component: CreditNoteLayoutComponent;
  let fixture: ComponentFixture<CreditNoteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditNoteLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditNoteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
