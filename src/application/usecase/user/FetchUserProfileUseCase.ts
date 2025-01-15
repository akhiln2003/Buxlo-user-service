import { User } from "../../../domain/entities/user";
import { IuserRepository } from "../../../domain/interfaces/Iuserrepository";
import { IfetchUserProfileUseCase } from "../../interface/user/IfetchUserProfileUseCase";


export class FetchUserProfileUseCase implements IfetchUserProfileUseCase{
  constructor(private userRepositary: IuserRepository) {}
    async execute(id: string): Promise<null | User> {
        return await this.userRepositary.getUserDetails(id);
    }
}