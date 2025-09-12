import { BadRequest, InternalServerError } from "@buxlo/common";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { IDeleteTrustedUsUseCase } from "../../interface/admin/IDeleteTrustedUsUseCase";
import { ITrustedUsRepository } from "../../../domain/interfaces/ITrustedUsRepository";

export class DeleteTrustedUsUseCase implements IDeleteTrustedUsUseCase {
  constructor(
    private _trustedUsRepository: ITrustedUsRepository,
    private _s3Service: IS3Service
  ) {}
  async execute(key: string, id: string): Promise<string> {
    try {
      if (!key || !id) {
        throw new BadRequest();
      }
      await this._s3Service.deleteImageFromBucket(`TrustedUs/${key}`);
      return await this._trustedUsRepository.delete(id);
    } catch (error) {
      console.error("Error from deleteUserProfileUseCase : ", error);

      throw new InternalServerError();
    }
  }
}
