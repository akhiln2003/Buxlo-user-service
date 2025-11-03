export interface IFetchMentorSummeryUseCase {
  execute(): Promise<{ totalUsers: number; userGrowth: IMentorGrowth[] }>;
}

export interface IMentorGrowth {
  month: string;
  count: number;
}
