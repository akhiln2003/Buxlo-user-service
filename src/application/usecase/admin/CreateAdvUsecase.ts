import sharp from "sharp";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import {
  ICreateAdvData,
  ICreateAdvUsecase,
} from "../../interface/admin/ICreateAdvUsecase";
import { Adv } from "../../../domain/entities/adv";
import { BadRequest } from "@buxlo/common";
import { IAdvRepository } from "../../../domain/interfaces/IAdvRepository";

export class CreateAdvUsecase implements ICreateAdvUsecase {
  constructor(
    private _s3Service: IS3Service,
    private _advRepository: IAdvRepository
  ) {}
  async execute(newData: ICreateAdvData, file: any): Promise<Adv | any> {
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

        const response = await this._s3Service.uploadImageToBucket(
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

      const data = await this._advRepository.create(newData);
      return data;
    } catch (error) {
      console.error(error);
      throw new BadRequest("Faild to upload image please try again laiter");
    }
  }
}
