import { BadRequest, InternalServerError } from "@buxlo/common";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IdeleteTrustedUsUseCase } from "../../interface/admin/IdeleteTrustedUsUseCase";
import { ItrustedUsRepository } from "../../../domain/interfaces/ItrustedUsRepository";

export class DeleteTrustedUsUseCase implements IdeleteTrustedUsUseCase {
  constructor(
    private _trustedUsRepository: ItrustedUsRepository,
    private _s3Service: Is3Service
  ) {}
  async execute(key: string, id: string): Promise<string | any> {
    try {
      if (!key || !id) {
        throw new BadRequest();
      }
      await this._s3Service.deleteImageFromBucket(`TrustedUs/${key}`);
      await this._trustedUsRepository.delete(id);

      return { data: "Successfully deleted trusted us logo image" };
    } catch (error) {
      console.error("Error from deleteUserProfileUseCase : ", error);

      throw new InternalServerError();
    }
  }
}
