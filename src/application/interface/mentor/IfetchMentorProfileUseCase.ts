import { Mentor } from "../../../domain/entities/mentor";

export interface IfetchMentorProfileUseCase {
  execute(id: string): Promise<any | Mentor>;
}
