import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfestShareComponent } from './devfest-share.component';

describe('DevfestShareComponent', () => {
  let component: DevfestShareComponent;
  let fixture: ComponentFixture<DevfestShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfestShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfestShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
