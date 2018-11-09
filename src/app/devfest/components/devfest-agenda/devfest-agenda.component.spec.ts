import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfestAgendaComponent } from './devfest-agenda.component';

describe('DevfestAgendaComponent', () => {
  let component: DevfestAgendaComponent;
  let fixture: ComponentFixture<DevfestAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfestAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfestAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
