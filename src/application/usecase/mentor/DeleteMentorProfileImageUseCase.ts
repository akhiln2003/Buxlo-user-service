import { BadRequest, InternalServerError } from "@buxlo/common";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IdeleteMentorProfileImageUseCase } from "../../interface/common/IdeleteProfileImageUseCase";
import { Mentor } from "../../../domain/entities/mentor";
import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";

export class DeleteMentorProfileImageUseCase
  implements IdeleteMentorProfileImageUseCase
{
  constructor(
    private _mentorRepositary: ImentorRepository,
    private _s3Service: Is3Service
  ) {}
  async execute(key: string, id: string): Promise<Mentor | any> {
    try {
      if (!key || !id) {
        throw new BadRequest();
      }
      await this._s3Service.deleteImageFromBucket( `MentorProfiles/${key}`);
      const data = await this._mentorRepositary.deleteMentorProfileData(id, {
        avatar: key,
      });

      return data;
    } catch (error) {
      console.error("Error from deleteMentorProfileUseCase : ", error);

      throw new InternalServerError();
    }
  }
}
