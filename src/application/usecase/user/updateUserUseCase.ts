import { BadRequest, InternalServerError } from "@buxlo/common";
import sharp from "sharp";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IuserRepository } from "../../../domain/interfaces/Iuserrepository";
import { User } from "../../../domain/entities/user";
import {
  IupdateUserProfileUseCase,
  IuserUpdateData,
} from "../../interface/user/IupdateUserProfileUseCase";
import { UserUpdatedProducer } from "../../../infrastructure/MessageBroker/kafka/producer/userUpdateProducer";

export class UpdateUserProfileUseCase implements IupdateUserProfileUseCase {
  constructor(
    private _userRepositary: IuserRepository,
    private _s3Service: Is3Service,
    private _userUpdateProducer: UserUpdatedProducer
  ) {}
  async execute(
    id: string,
    updatedData: IuserUpdateData,
    file: any,
    currentProfileImage: string | undefined
  ): Promise<any | User> {
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
      return data;
    } catch (error) {
      console.error(error);
      throw new InternalServerError();
    }
  }
}
