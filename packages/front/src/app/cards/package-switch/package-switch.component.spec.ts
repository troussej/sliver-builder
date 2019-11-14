import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageSwitchComponent } from './package-switch.component';

describe('PackageSwitchComponent', () => {
  let component: PackageSwitchComponent;
  let fixture: ComponentFixture<PackageSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
