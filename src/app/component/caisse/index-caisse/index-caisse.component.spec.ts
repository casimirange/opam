import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCaisseComponent } from './index-caisse.component';

describe('IndexCaisseComponent', () => {
  let component: IndexCaisseComponent;
  let fixture: ComponentFixture<IndexCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCaisseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
