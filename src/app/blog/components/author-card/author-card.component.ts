import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { GdgTeamMember } from "../../../models/gdg-team-member.model";

@Component({
  selector: "app-author-card",
  templateUrl: "./author-card.component.html",
  styleUrls: ["./author-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorCardComponent implements OnInit {
  @Input() author: GdgTeamMember;

  constructor() {}

  ngOnInit() {}
}
