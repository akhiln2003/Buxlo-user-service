
export interface IdeleteTrustedUsUseCase {
    execute(key: string, id: string): Promise<string | any>;
  }