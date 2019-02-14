import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { GdgTeamMember } from "../../../models/gdg-team-member.model";
import { GdgTagsTypes } from "../../../models/gdg-tag.model";
import {
  faLinkedin,
  faGithubSquare,
  faTwitterSquare
} from "@fortawesome/fontawesome-free-brands";

@Component({
  selector: "app-team-member",
  templateUrl: "./team-member.component.html",
  styleUrls: ["./team-member.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamMemberComponent implements OnInit {
  @Input() teamMember: GdgTeamMember;
  @Input() lp: number;

  faLinkedin = faLinkedin;
  faGithubSquare = faGithubSquare;
  faTwitterSquare = faTwitterSquare;

  constructor() {}

  ngOnInit() {}

  getCardColorCss(i: number): {} {
    const r = i % 4;
    switch (r) {
      case 1:
        return { "mat-card-header-yellow": true };
      case 2:
        return { "mat-card-header-green": true };
      case 3:
        return { "mat-card-header-red": true };
      case 0:
        return { "mat-card-header-blue": true };
      default:
        return { "mat-card-header-yellow": true };
    }
  }

  getChipColorCss(name: string): {} {
    if (name) {
      switch (name.toLowerCase()) {
        case GdgTagsTypes.CORE_TEAM:
          return { "my-chip-core-team": true };
        case GdgTagsTypes.DESIGN:
          return { "my-chip-design": true };
        case GdgTagsTypes.FIREBASE:
          return { "my-chip-firebase": true };
        case GdgTagsTypes.MOBILE:
          return { "my-chip-mobile": true };
        case GdgTagsTypes.WEB:
          return { "my-chip-web": true };
        default:
          return {};
      }
    } else {
      return {};
    }
  }
}
