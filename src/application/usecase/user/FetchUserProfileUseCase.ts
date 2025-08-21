import { IuserRepository } from "../../../domain/interfaces/Iuserrepository";
import { UserResponseDto } from "../../../zodSchemaDto/output/userResponse.dto";
import { IfetchUserProfileUseCase } from "../../interface/user/IfetchUserProfileUseCase";

export class FetchUserProfileUseCase implements IfetchUserProfileUseCase {
  constructor(private _userRepositary: IuserRepository) {}
  async execute(id: string): Promise<UserResponseDto> {
    return await this._userRepositary.getUserDetails(id);
  }
}
