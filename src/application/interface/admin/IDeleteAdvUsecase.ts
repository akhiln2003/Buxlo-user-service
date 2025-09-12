
export interface IDeleteAdvUseCase {
  execute(key: string, id: string): Promise<string>;
}