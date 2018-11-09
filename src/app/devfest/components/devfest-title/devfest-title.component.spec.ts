import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfestTitleComponent } from './devfest-title.component';

describe('DevfestTitleComponent', () => {
  let component: DevfestTitleComponent;
  let fixture: ComponentFixture<DevfestTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfestTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfestTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
