import { User } from "../../../domain/entities/user";

export interface IfetchUserProfileUseCase{
    execute( id: string ): Promise<null|User>;
}