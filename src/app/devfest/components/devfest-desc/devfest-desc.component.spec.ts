import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfestDescComponent } from './devfest-desc.component';

describe('DevfestDescComponent', () => {
  let component: DevfestDescComponent;
  let fixture: ComponentFixture<DevfestDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfestDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfestDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
