import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentCardComponent } from './home-content-card.component';

describe('HomeContentCardComponent', () => {
  let component: HomeContentCardComponent;
  let fixture: ComponentFixture<HomeContentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeContentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
