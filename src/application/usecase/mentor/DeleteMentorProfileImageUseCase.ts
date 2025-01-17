import { BadRequest, InternalServerError } from "@buxlo/common";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IdeleteMentorProfileImageUseCase } from "../../interface/common/IdeleteProfileImageUseCase";
import { Mentor } from "../../../domain/entities/mentor";
import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";

export class DeleteMentorProfileImageUseCase
  implements IdeleteMentorProfileImageUseCase
{
  constructor(
    private mentorRepositary: ImentorRepository,
    private s3Service: Is3Service
  ) {}
  async execute(key: string, id: string): Promise<Mentor | any> {
    try {
      if (!key || !id) {
        throw new BadRequest();
      }
      await this.s3Service.deleteImageFromBucket( `mentorProfiles/${key}`);
      const data = await this.mentorRepositary.deleteMentorProfileData(id, {
        avatar: key,
      });

      return data;
    } catch (error) {
      console.error("Error from deleteMentorProfileUseCase : ", error);

      throw new InternalServerError();
    }
  }
}
