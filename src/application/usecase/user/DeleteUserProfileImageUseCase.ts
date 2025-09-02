import { BadRequest, InternalServerError } from "@buxlo/common";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { IDeleteUserProfileImageUseCase } from "../../interface/common/IDeleteProfileImageUseCase";
import { IUserRepository } from "../../../domain/interfaces/IUserrepository";
import {
  UserMapper,
  UserResponseDto,
} from "../../../domain/zodSchemaDto/output/userResponse.dto";

export class DeleteUserProfileImageUseCase
  implements IDeleteUserProfileImageUseCase
{
  constructor(
    private _userRepositary: IUserRepository,
    private _s3Service: IS3Service
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
