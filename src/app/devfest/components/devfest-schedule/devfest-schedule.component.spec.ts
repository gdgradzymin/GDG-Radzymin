import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfestScheduleComponent } from './devfest-schedule.component';

describe('DevfestScheduleComponent', () => {
  let component: DevfestScheduleComponent;
  let fixture: ComponentFixture<DevfestScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfestScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfestScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
