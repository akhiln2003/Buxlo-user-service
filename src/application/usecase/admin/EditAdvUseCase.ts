import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { IAdvRepository } from "../../../domain/interfaces/IAdvRepository";
import {
  IEditAdvUseCase,
  IQueryData,
} from "../../interface/admin/IEditAdvUseCase";
import { Adv } from "../../../domain/entities/adv";
import { BadRequest, InternalServerError } from "@buxlo/common";
import sharp from "sharp";

export class EditAdvUseCase implements IEditAdvUseCase {
  constructor(
    private _advRepositary: IAdvRepository,
    private _s3Service: IS3Service
  ) {}

  async execute(data: IQueryData, file: any): Promise<Adv | any> {
    try {
      if (file) {
        if (data.currentImage) {
          await this._s3Service.deleteImageFromBucket(
            `Adv/${data.currentImage}`
          );
        }
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
          data = {
            ...data,
            image: `${randomImageName}`,
          };
        } else {
          throw new BadRequest("Faild to upload image please try again laiter");
        }
      }
      delete data.currentImage;

      if (data) {
        const query: any = {};

        // Add fields to the query only if they have a value
        if (data.title?.trim()) {
          query.title = data.title.trim();
        }

        if (data.description?.trim()) {
          query.description = data.description.trim();
        }

        if (data.image) {
          query.image = data.image; // Assuming you're uploading a single image
        }

        const updatedData = await this._advRepositary.update(
          data.id as string,
          query
        );

        return updatedData;
      } else {
        throw new BadRequest("Somthing when rong please try again laiter");
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerError();
    }
  }
}
