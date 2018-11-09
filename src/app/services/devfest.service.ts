import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GdgDevFest } from "../models/gdg-devfest.model";

@Injectable({
  providedIn: "root"
})
export class DevfestService {

  devFestDate: number;

  constructor() { }
}
