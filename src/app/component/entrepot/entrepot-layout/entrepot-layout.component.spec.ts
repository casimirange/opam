import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepotLayoutComponent } from './entrepot-layout.component';

describe('EntrepotLayoutComponent', () => {
  let component: EntrepotLayoutComponent;
  let fixture: ComponentFixture<EntrepotLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepotLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepotLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
