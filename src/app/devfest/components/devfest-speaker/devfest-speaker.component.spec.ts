import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfestSpeakerComponent } from './devfest-speaker.component';

describe('DevfestSpeakerComponent', () => {
  let component: DevfestSpeakerComponent;
  let fixture: ComponentFixture<DevfestSpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfestSpeakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfestSpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
