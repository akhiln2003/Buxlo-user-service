import { Mentor } from "../../../domain/entities/mentor";
import { User } from "../../../domain/entities/user";

export interface IdeleteMentorProfileImageUseCase {
  execute(key: string, id: string): Promise<Mentor | any>;
}



export interface IdeleteUserProfileImageUseCase {
  execute(key: string, id: string): Promise<User | any>;
}