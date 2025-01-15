import { BadRequest, InternalServerError } from "@buxlo/common";
import { Mentor } from "../../../domain/entities/mentor";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IupdateData } from "../../interface/mentor/IupdateMentorProfileUseCase";
import sharp from "sharp";
import { IupdateUserProfileUseCase } from "../../interface/user/IupdateUserProfileUseCase";
import { IuserRepository } from "../../../domain/interfaces/Iuserrepository";

export class UpdateUserProfileUseCase implements IupdateUserProfileUseCase {
  constructor(
    private userRepositary: IuserRepository,
    private s3Service: Is3Service
  ) {}
  async execute(
    id: string,
    updatedData: IupdateData,
    file: any
  ): Promise<any | Mentor> {
    try {
      if (file) {
        const randomImageName = Math.random() + Date.now();

        // rezize image
        const buffer = await sharp(file.buffer)
          .resize({ height: 300, width: 300, fit: "cover" })
          .toBuffer();

        const data = await this.s3Service.uploadImageToBucket(
          buffer,
          file.mimetype,
          `mentorProfiles/${randomImageName}`
        );
        if (data.$metadata.httpStatusCode == 200) {
          updatedData = {
            ...updatedData,
            avatar: `${randomImageName}`,
          };
        } else {
          throw new BadRequest("Profile upload faild please try again laiter");
        }
      }

      const data = await this.userRepositary.updateUserProfileData(
        id,
        updatedData
      );
      return data;
    } catch (error) {
      console.error(error);
      throw new InternalServerError();
    }
  }
}
