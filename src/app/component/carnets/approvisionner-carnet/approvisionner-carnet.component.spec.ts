import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ApprovisionnerCarnetComponent} from "./approvisionner-carnet.component";



describe('ApprovisionnerComponent', () => {
  let component: ApprovisionnerCarnetComponent;
  let fixture: ComponentFixture<ApprovisionnerCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovisionnerCarnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovisionnerCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
