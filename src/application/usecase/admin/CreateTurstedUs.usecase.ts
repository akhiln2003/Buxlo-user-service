import { BadRequest } from "@buxlo/common";
import { ITrustedUsRepository } from "../../../domain/interfaces/ITrustedUsRepository";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { ICreateTurstedUsUsecase } from "../../interface/admin/ICreateTurstedUsUsecase";
import sharp from "sharp";
import {
  TrustedUsMapper,
  TrustedUsResponseDto,
} from "../../dto/trustedUsResponse.dto";

export class CreateTurstedUsUsecase implements ICreateTurstedUsUsecase {
  constructor(
    private _s3Service: IS3Service,
    private _trustedUsRepository: ITrustedUsRepository
  ) {}
  async execute(file: any): Promise<TrustedUsResponseDto> {
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

        const response = await this._s3Service.uploadImageToBucket(
          buffer,
          file.mimetype,
          `TrustedUs/${randomImageName}`
        );

        if (response.$metadata.httpStatusCode == 200) {
          const newData = {
            image: `${randomImageName}`,
          };
          const data = await this._trustedUsRepository.create(newData);
          return TrustedUsMapper.toDto(data);
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
