import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlanqueamientoComponent } from './blanqueamiento.component';

describe('BlanqueamientoComponent', () => {
  let component: BlanqueamientoComponent;
  let fixture: ComponentFixture<BlanqueamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlanqueamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlanqueamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
