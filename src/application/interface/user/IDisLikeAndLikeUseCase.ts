export interface IDisLikeAndLikeUseCase {
  execute(data: {
    id: string;
    userId: string;
    option: "like" | "disLike";
    remove: boolean;
  }): Promise<void>;
}
