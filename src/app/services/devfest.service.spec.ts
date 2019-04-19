import { TestBed, inject } from "@angular/core/testing";

import { DevfestService } from "./devfest.service";

describe("DevfestService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevfestService]
    });
  });

  it("should be created", inject([DevfestService], (service: DevfestService) => {
    expect(service).toBeTruthy();
  }));
});
