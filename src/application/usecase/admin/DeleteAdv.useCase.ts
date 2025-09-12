import { BadRequest, InternalServerError } from "@buxlo/common";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { IAdvRepository } from "../../../domain/interfaces/IAdvRepository";
import { IDeleteAdvUseCase } from "../../interface/admin/IDeleteAdvUsecase";

export class DeleteAdvUseCase implements IDeleteAdvUseCase {
  constructor(
    private _advRepositary: IAdvRepository,
    private _s3Service: IS3Service
  ) {}
  async execute(key: string, id: string): Promise<string> {
    try {
      if (!key || !id) {
        throw new BadRequest();
      }
      await this._s3Service.deleteImageFromBucket(`userProfiles/${key}`);
      return await this._advRepositary.delete(id);
      
    } catch (error) {
      console.error("Error from deleteUserProfileUseCase : ", error);

      throw new InternalServerError();
    }
  }
}
