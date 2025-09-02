import { IUserRepository } from "../../../domain/interfaces/IUserrepository";
import {
  UserMapper,
  UserResponseDto,
} from "../../../domain/zodSchemaDto/output/userResponse.dto";
import { IFetchUserProfileUseCase } from "../../interface/user/IFetchUserProfileUseCase";

export class FetchUserProfileUseCase implements IFetchUserProfileUseCase {
  constructor(private _userRepositary: IUserRepository) {}
  async execute(id: string): Promise<UserResponseDto> {
    const data = await this._userRepositary.getUserDetails(id);
    return UserMapper.toDto(data);
  }
}
