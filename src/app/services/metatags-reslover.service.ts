import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { SettingsService, Metatags } from "./settings.service";
import { Observable,  } from "rxjs";

@Injectable()
export class MetatagsResolver implements Resolve<Metatags> {
  constructor(private settings: SettingsService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Metatags> | Promise<Metatags> | Metatags {
    console.log("Route URL: " + route.url.toString());
    return this.settings.getMetatags(route.url.toString());
  }
}
