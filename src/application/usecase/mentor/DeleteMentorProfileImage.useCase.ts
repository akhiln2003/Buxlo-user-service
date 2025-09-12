import { BadRequest, InternalServerError } from "@buxlo/common";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { IDeleteMentorProfileImageUseCase } from "../../interface/common/IDeleteProfileImageUseCase";
import { IMentorRepository } from "../../../domain/interfaces/IMentorRepository";
import {
  MentorMapper,
  MentorResponseDto,
} from "../../../domain/zodSchemaDto/output/mentorResponse.dto";

export class DeleteMentorProfileImageUseCase
  implements IDeleteMentorProfileImageUseCase
{
  constructor(
    private _mentorRepositary: IMentorRepository,
    private _s3Service: IS3Service
  ) {}
  async execute(key: string, id: string): Promise<MentorResponseDto> {
    try {
      if (!key || !id) {
        throw new BadRequest();
      }
      await this._s3Service.deleteImageFromBucket(`MentorProfiles/${key}`);
      const data = await this._mentorRepositary.deleteMentorProfileData(id, {
        avatar: key,
      });

      return MentorMapper.toDto(data);
    } catch (error) {
      console.error("Error from deleteMentorProfileUseCase : ", error);

      throw new InternalServerError();
    }
  }
}
