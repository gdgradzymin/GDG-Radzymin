import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfestScheduleItemComponent } from './devfest-schedule-item.component';

describe('DevfestScheduleItemComponent', () => {
  let component: DevfestScheduleItemComponent;
  let fixture: ComponentFixture<DevfestScheduleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfestScheduleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfestScheduleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
