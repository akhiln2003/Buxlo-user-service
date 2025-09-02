import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import { MentorMapper, MentorResponseDto } from "../../../domain/zodSchemaDto/output/mentorResponse.dto";
import { IfetchMentorProfileUseCase } from "../../interface/mentor/IfetchMentorProfileUseCase";

export class FetchMentorProfileUseCase implements IfetchMentorProfileUseCase {
  constructor(private _mentorRepositary: ImentorRepository) {}
  async execute(id: string): Promise<MentorResponseDto> {
      const data = await this._mentorRepositary.getMentorDetails(id);
      return MentorMapper.toDto(data);

  }
}
