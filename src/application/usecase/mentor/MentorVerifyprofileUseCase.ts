import { BadRequest, InternalServerError } from "@buxlo/common";
import { Mentor } from "../../../domain/entities/mentor";
import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import { ImentorVerifyprofileUseCase } from "../../interface/mentor/ImentorVerifyprofileUseCase";
import sharp from "sharp";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";

export class MentorVerifyprofileUseCase implements ImentorVerifyprofileUseCase {
  constructor(
    private _mentorRepository: ImentorRepository,
    private _s3Service: Is3Service
  ) {}

  async execute(
    id: string,
    files: any,
    query: {
      aadhaarName: string;
      aadhaarNumber: string;
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      verified: "verified" | "applicationPending" | "verificationPending";
    }
  ): Promise<any | Mentor> {
    try {
      if (!files.frontImage || !files.backImage || !id || !query) {
        throw new BadRequest("Somthing when wrong please try again laiter");
      }

      const randomFriendImageName = Math.random() + Date.now();
      const randomBackImageName = Math.random() + Date.now();

      // rezize friend image
      const friendBuffer = await sharp(files.frontImage[0].buffer)
        .resize({
          height: 300,
          width: 400,
          fit: "fill",
        })
        .toBuffer();

      // rezize back image
      const backBuffer = await sharp(files.backImage[0].buffer)
        .resize({
          height: 300,
          width: 400,
          fit: "fill",
        })
        .toBuffer();

      const friendImageResponse = await this._s3Service.uploadImageToBucket(
        backBuffer,
        files.backImage[0].mimetype,
        `Kyc/${randomBackImageName}`
      );
      const backImageResponse = await this._s3Service.uploadImageToBucket(
        friendBuffer,
        files.frontImage[0].mimetype,
        `Kyc/${randomFriendImageName}`
      );

      if (
        friendImageResponse.$metadata.httpStatusCode == 200 &&
        backImageResponse.$metadata.httpStatusCode == 200
      ) {
        query = {
          ...query,
          aadhaarFrontImage: `${randomFriendImageName}`,
          aadhaarBackImage: `${randomBackImageName}`,
        };
      } else {
        throw new BadRequest("Faild to upload image please try again laiter");
      }

      const data = await this._mentorRepository.applyProfileVerification(
        id,
        query
      );

      return data;
    } catch (error) {
      console.error(error);
      throw new InternalServerError();
    }
  }
}
