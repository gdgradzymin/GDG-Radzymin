import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { SettingsService, Metatags } from "./settings.service";
import { Observable, of } from "rxjs";

@Injectable()
export class MetatagsResolver implements Resolve<Metatags> {
  constructor(private settings: SettingsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Metatags> | Promise<Metatags> | Metatags {
    console.log("Route URL: " + route.url.toString());
    return this.settings.getMetatags(route.url.toString());
  }
}
