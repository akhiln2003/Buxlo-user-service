import { BadRequest } from "@buxlo/common";
import { ItrustedUsRepository } from "../../../domain/interfaces/ItrustedUsRepository";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IcreateTurstedUsUsecase } from "../../interface/admin/IcreateTurstedUsUsecase";
import sharp from "sharp";

export class CreateTurstedUsUsecase implements IcreateTurstedUsUsecase {
  constructor(
    private s3Service: Is3Service,
    private trustedUsRepository: ItrustedUsRepository
  ) {}
  async execute(file: any): Promise<any> {
    try {
      if (file) {
        const randomImageName = Math.random() + Date.now();

        // rezize image
        const buffer = await sharp(file.buffer)
          .resize({
            height: 82, // Match your desired height
            width: 256, // Match your desired width
            fit: "fill",
          })
          .toBuffer();

        const response = await this.s3Service.uploadImageToBucket(
          buffer,
          file.mimetype,
          `TrustedUs/${randomImageName}`
        );

        if (response.$metadata.httpStatusCode == 200) {
          const newData = {
            image: `${randomImageName}`,
          };
          const data = await this.trustedUsRepository.create(newData);
          return data;
        } else {
          throw new BadRequest("Profile upload faild please try again laiter");
        }
      }
      throw new BadRequest("Faild to upload image");
    } catch (error) {
      console.error(error);
      throw new BadRequest("Faild to upload image");
    }
  }
}
