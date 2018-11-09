import { DevFestModule } from "./devfest.module";

describe("DevFestModule", () => {
  let devFestModule: DevFestModule;

  beforeEach(() => {
    devFestModule = new DevFestModule();
  });

  it("should create an instance", () => {
    expect(devFestModule).toBeTruthy();
  });
});
