import { BadRequest, InternalServerError } from "@buxlo/common";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { User } from "../../../domain/entities/user";
import { IdeleteAdvImageUseCase } from "../../interface/admin/IdeleteAdvImageUsecase";
import { IadvRepository } from "../../../domain/interfaces/IadvRepository";

export class DeleteAdvImageUseCase
  implements IdeleteAdvImageUseCase{
  constructor(
    private advRepositary: IadvRepository,
    private s3Service: Is3Service
  ) {}
  async execute(key: string, id: string): Promise<User | any> {
    try {
      if (!key || !id) {
        throw new BadRequest();
      }
      await this.s3Service.deleteImageFromBucket( `userProfiles/${key}`);
      const data = await this.advRepositary.delete(id);

      return data;
    } catch (error) {
      console.error("Error from deleteUserProfileUseCase : ", error);

      throw new InternalServerError();
    }
  }
}
