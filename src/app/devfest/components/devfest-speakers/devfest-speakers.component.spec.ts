import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfestSpeakersComponent } from './devfest-speakers.component';

describe('DevfestSpeakersComponent', () => {
  let component: DevfestSpeakersComponent;
  let fixture: ComponentFixture<DevfestSpeakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfestSpeakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfestSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
