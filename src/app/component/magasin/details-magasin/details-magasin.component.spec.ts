import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMagasinComponent } from './details-magasin.component';

describe('DetailsMagasinComponent', () => {
  let component: DetailsMagasinComponent;
  let fixture: ComponentFixture<DetailsMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMagasinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
