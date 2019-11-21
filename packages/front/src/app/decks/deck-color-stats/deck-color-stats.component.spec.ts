import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckColorStatsComponent } from './deck-color-stats.component';

describe('DeckColorStatsComponent', () => {
  let component: DeckColorStatsComponent;
  let fixture: ComponentFixture<DeckColorStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckColorStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckColorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
