import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdgDisclaimerComponent } from './gdg-disclaimer.component';

describe('GdgDisclaimerComponent', () => {
  let component: GdgDisclaimerComponent;
  let fixture: ComponentFixture<GdgDisclaimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdgDisclaimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdgDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
