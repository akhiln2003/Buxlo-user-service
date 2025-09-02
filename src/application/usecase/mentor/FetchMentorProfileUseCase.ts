import { IMentorRepository } from "../../../domain/interfaces/IMentorRepository";
import {
  MentorMapper,
  MentorResponseDto,
} from "../../../domain/zodSchemaDto/output/mentorResponse.dto";
import { IFetchMentorProfileUseCase } from "../../interface/mentor/IFetchMentorProfileUseCase";

export class FetchMentorProfileUseCase implements IFetchMentorProfileUseCase {
  constructor(private _mentorRepositary: IMentorRepository) {}
  async execute(id: string): Promise<MentorResponseDto> {
    const data = await this._mentorRepositary.getMentorDetails(id);
    return MentorMapper.toDto(data);
  }
}
