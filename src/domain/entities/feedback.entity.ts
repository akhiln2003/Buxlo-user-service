export class FeedBack {
  constructor(
    public mentorId: string,
    public userId: string,
    public message: string,
    public star: number,
    public id?: string,
    public dislike?: string[],
    public like?: string[]
  ) {}
}

export interface PopulatedFeedBack extends Omit<FeedBack, "userId"> {
  user: {
    name: string;
    email: string;
    avatar?: string;
    id?: string;
  };
}
