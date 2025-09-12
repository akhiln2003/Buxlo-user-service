export interface IFetchS3ImageUseCase {
  execute(key: string[]): Promise<string[]>;
}
