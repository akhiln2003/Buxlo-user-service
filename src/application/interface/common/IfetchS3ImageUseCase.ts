export interface IfetchS3ImageUseCase {
  execute(key: string[]): Promise<string[] | any>;
}
