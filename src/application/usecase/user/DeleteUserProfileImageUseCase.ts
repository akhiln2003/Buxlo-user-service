import { BadRequest, InternalServerError } from "@buxlo/common";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IdeleteUserProfileImageUseCase } from "../../interface/common/IdeleteProfileImageUseCase";
import { IuserRepository } from "../../../domain/interfaces/Iuserrepository";
import {
  UserMapper,
  UserResponseDto,
} from "../../../domain/zodSchemaDto/output/userResponse.dto";

export class DeleteUserProfileImageUseCase
  implements IdeleteUserProfileImageUseCase
{
  constructor(
    private _userRepositary: IuserRepository,
    private _s3Service: Is3Service
  ) {}
  async execute(key: string, id: string): Promise<UserResponseDto> {
    try {
      if (!key || !id) {
        throw new BadRequest();
      }
      await this._s3Service.deleteImageFromBucket(`UserProfiles/${key}`);
      const data = await this._userRepositary.deleteUserProfileData(id, {
        avatar: key,
      });

      return UserMapper.toDto(data);
    } catch (error) {
      console.error("Error from deleteUserProfileUseCase : ", error);

      throw new InternalServerError();
    }
  }
}
