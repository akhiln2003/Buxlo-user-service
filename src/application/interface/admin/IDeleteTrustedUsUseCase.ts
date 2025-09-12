
export interface IDeleteTrustedUsUseCase {
    execute(key: string, id: string): Promise<string>;
  }