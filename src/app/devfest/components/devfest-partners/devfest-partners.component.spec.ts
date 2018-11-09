import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfestPartnersComponent } from './devfest-partners.component';

describe('DevfestPartnersComponent', () => {
  let component: DevfestPartnersComponent;
  let fixture: ComponentFixture<DevfestPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfestPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfestPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
