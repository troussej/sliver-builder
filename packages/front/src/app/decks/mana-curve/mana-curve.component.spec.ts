import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaCurveComponent } from './mana-curve.component';

describe('ManaCurveComponent', () => {
  let component: ManaCurveComponent;
  let fixture: ComponentFixture<ManaCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManaCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManaCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
