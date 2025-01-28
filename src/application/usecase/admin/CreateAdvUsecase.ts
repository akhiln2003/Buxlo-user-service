import sharp from "sharp";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import {
  IcreateAdvData,
  IcreateAdvUsecase,
} from "../../interface/admin/IcreateAdvUsecase";
import { Adv } from "../../../domain/entities/adv";
import { BadRequest } from "@buxlo/common";
import { IadvRepository } from "../../../domain/interfaces/IadvRepository";

export class CreateAdvUsecase implements IcreateAdvUsecase {
  constructor(
    private s3Service: Is3Service,
    private advRepository: IadvRepository
  ) {}
  async execute(newData: IcreateAdvData, file: any): Promise<Adv | any> {
    try {
      if (!file || !newData) {
        throw new BadRequest("Faild to create pleas try again");
      }
      if (file) {
        const randomImageName = Math.random() + Date.now();

        // rezize image
        const buffer = await sharp(file.buffer)
          .resize({
            height: 300,
            width: 400,
            fit: "fill",
          })
          .toBuffer();
          
        const response = await this.s3Service.uploadImageToBucket(
          buffer,
          file.mimetype,
          `Adv/${randomImageName}`
        );

        if (response.$metadata.httpStatusCode == 200) {
          newData = {
            ...newData,
            image: `${randomImageName}`,
          };
        } else {
          throw new BadRequest("Faild to upload image please try again laiter");
        }
      }

      const data = await this.advRepository.create(newData);
      return data;
    } catch (error) {
      console.error(error);
      throw new BadRequest("Faild to upload image please try again laiter");
    }
  }
}
