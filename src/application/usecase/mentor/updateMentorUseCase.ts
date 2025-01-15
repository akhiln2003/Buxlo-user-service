import { BadRequest, InternalServerError } from "@buxlo/common";
import { Mentor } from "../../../domain/entities/mentor";
import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import {
  IupdateData,
  IupdateMentorProfileUseCase,
} from "../../interface/mentor/IupdateMentorProfileUseCase";
import sharp from "sharp";

export class UpdateMentorProfileUseCase implements IupdateMentorProfileUseCase {
  constructor(
    private mentorRepositary: ImentorRepository,
    private s3Service: Is3Service
  ) {}
  async execute(
    id: string,
    updatedData: IupdateData,
    file: any
  ): Promise<any | Mentor> {
    try {
      if (file) {
        const randomImageName = Math.random()+Date.now();

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
        }
        else{          
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
