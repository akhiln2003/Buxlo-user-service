import { Mentor } from "../../../domain/entities/mentor";
import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import { IfetchMentorProfileUseCase } from "../../interface/mentor/IfetchMentorProfileUseCase";

export class FetchMentorProfileUseCase implements IfetchMentorProfileUseCase {
  constructor(private mentorRepositary: ImentorRepository) {}
  async execute(id: string): Promise<any | Mentor> {
    try {
      const data = await this.mentorRepositary.getMentorDetails(id);
      return data;
      
    } catch (error) {
      return {
        error: error,
      };
    }
  }
}
