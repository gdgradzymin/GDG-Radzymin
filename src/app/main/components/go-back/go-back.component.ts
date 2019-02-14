import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-go-back",
  templateUrl: "./go-back.component.html",
  styleUrls: ["./go-back.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoBackComponent implements OnInit {
  @Input() goBackTo: string;

  constructor() {}

  ngOnInit() {}
}
