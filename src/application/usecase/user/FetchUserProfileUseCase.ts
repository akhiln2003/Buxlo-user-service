import { IuserRepository } from "../../../domain/interfaces/Iuserrepository";
import {
  UserMapper,
  UserResponseDto,
} from "../../../domain/zodSchemaDto/output/userResponse.dto";
import { IfetchUserProfileUseCase } from "../../interface/user/IfetchUserProfileUseCase";

export class FetchUserProfileUseCase implements IfetchUserProfileUseCase {
  constructor(private _userRepositary: IuserRepository) {}
  async execute(id: string): Promise<UserResponseDto> {
    const data = await this._userRepositary.getUserDetails(id);
    return UserMapper.toDto(data);
  }
}
