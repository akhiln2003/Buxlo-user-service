import { BadRequest, InternalServerError } from "@buxlo/common";
import { Mentor } from "../../../domain/entities/mentor";
import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import {
  ImentorUpdateData,
  IupdateMentorProfileUseCase,
} from "../../interface/mentor/IupdateMentorProfileUseCase";
import sharp from "sharp";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";

export class UpdateMentorProfileUseCase implements IupdateMentorProfileUseCase {
  constructor(
    private mentorRepositary: ImentorRepository,
    private s3Service: Is3Service
  ) {}
  async execute(
    id: string,
    updatedData: ImentorUpdateData,
    file: any,
    currentProfileImage: string | undefined
  ): Promise<any | Mentor> {
    try {
      if (file) {
        if (currentProfileImage) {
          await this.s3Service.deleteImageFromBucket(
            `mentorProfiles/${currentProfileImage}`
          );
        }
        const randomImageName = Math.random() + Date.now();

        // rezize image
        const buffer = await sharp(file.buffer)
          .resize({ height: 300, width: 300, fit: "cover" })
          .toBuffer();

        const response = await this.s3Service.uploadImageToBucket(
          buffer,
          file.mimetype,
          `MentorProfiles/${randomImageName}`
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
      const data = await this.mentorRepositary.updateMentorProfile(
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
