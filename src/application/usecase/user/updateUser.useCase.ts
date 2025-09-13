import { BadRequest, InternalServerError } from "@buxlo/common";
import sharp from "sharp";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { IUserRepository } from "../../../domain/interfaces/IUserrepository";
import {
  IUpdateUserProfileUseCase,
  IUserUpdateData,
} from "../../interface/user/IUpdateUserProfileUseCase";
import { UserUpdatedProducer } from "../../../infrastructure/MessageBroker/kafka/producer/userUpdateProducer";
import {
  UserMapper,
  UserResponseDto,
} from "../../dto/userResponse.dto";

export class UpdateUserProfileUseCase implements IUpdateUserProfileUseCase {
  constructor(
    private _userRepositary: IUserRepository,
    private _s3Service: IS3Service,
    private _userUpdateProducer: UserUpdatedProducer
  ) {}
  async execute(
    id: string,
    updatedData: IUserUpdateData,
    file: any,
    currentProfileImage: string | undefined
  ): Promise<UserResponseDto> {
    try {
      if (file) {
        if (currentProfileImage) {
          await this._s3Service.deleteImageFromBucket(
            `UserProfiles/${currentProfileImage}`
          );
        }
        const randomImageName = Math.random() + Date.now();

        // rezize image
        const buffer = await sharp(file.buffer)
          .resize({ height: 300, width: 300, fit: "cover" })
          .toBuffer();

        const response = await this._s3Service.uploadImageToBucket(
          buffer,
          file.mimetype,
          `UserProfiles/${randomImageName}`
        );
        if (response.$metadata.httpStatusCode == 200) {
          updatedData = {
            ...updatedData,
            avatar: `${randomImageName}`,
          };
        } else {
          throw new BadRequest("Profile upload faild please try again laiter");
        }
      }
      const data = await this._userRepositary.updateUserProfile(
        id,
        updatedData
      );
      this._userUpdateProducer.produce({ id, query: updatedData });
      return UserMapper.toDto(data);
    } catch (error) {
      console.error(error);
      throw new InternalServerError();
    }
  }
}
