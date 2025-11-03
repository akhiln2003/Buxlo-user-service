export interface IFetchUserSummeryUseCase {
  execute(): Promise<{ totalUsers: number; userGrowth: IuserGrowth[] }>;
}

export interface IuserGrowth {
  month: string;
  count: number;
}
