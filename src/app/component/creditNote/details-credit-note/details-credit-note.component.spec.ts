import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCreditNoteComponent } from './details-credit-note.component';

describe('DetailsCreditNoteComponent', () => {
  let component: DetailsCreditNoteComponent;
  let fixture: ComponentFixture<DetailsCreditNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCreditNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
