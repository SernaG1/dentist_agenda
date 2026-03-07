import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenoSonrisaComponent } from './diseno-sonrisa.component';

describe('DisenoSonrisaComponent', () => {
  let component: DisenoSonrisaComponent;
  let fixture: ComponentFixture<DisenoSonrisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisenoSonrisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisenoSonrisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
