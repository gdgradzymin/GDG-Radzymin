import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DevFestComponent } from "./devfest.component";

describe("DevfestComponent", () => {
  let component: DevFestComponent;
  let fixture: ComponentFixture<DevFestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevFestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevFestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
