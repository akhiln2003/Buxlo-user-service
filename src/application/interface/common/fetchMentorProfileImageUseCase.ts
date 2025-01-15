export interface IfetchProfileImageUseCase{
      execute(key: string): Promise<string | any>;
    
}