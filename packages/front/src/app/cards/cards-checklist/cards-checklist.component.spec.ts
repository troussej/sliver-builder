import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsChecklistComponent } from './cards-checklist.component';

describe('CardsChecklistComponent', () => {
  let component: CardsChecklistComponent;
  let fixture: ComponentFixture<CardsChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
