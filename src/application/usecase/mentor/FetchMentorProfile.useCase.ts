import { BadRequest } from "@buxlo/common";
import { IMentorRepository } from "../../../domain/interfaces/IMentorRepository";
import {
  MentorMapper,
  MentorResponseDto,
} from "../../dto/mentorResponse.dto";
import { IFetchMentorProfileUseCase } from "../../interface/mentor/IFetchMentorProfileUseCase";

export class FetchMentorProfileUseCase implements IFetchMentorProfileUseCase {
  constructor(private _mentorRepositary: IMentorRepository) {}
  async execute(id: string): Promise<MentorResponseDto> {
    const data = await this._mentorRepositary.getMentorDetails(id);
    if (!data) throw new BadRequest("Faild to fetch mentor details");
    return MentorMapper.toDto(data);
  }
}
