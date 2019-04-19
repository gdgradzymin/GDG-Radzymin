export interface GdgTeamMemberModel {
  name: string;
  tags: string[];
  profilePhoto?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
}

export class GdgTeamMember implements GdgTeamMemberModel {
  constructor(
    public name: string,
    public tags: string[],
    public profilePhoto: string,
    public linkedinUrl: string,
    public twitterUrl: string,
    public githubUrl: string
  ) {}
}
