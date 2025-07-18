import { Mentor } from "../../../domain/entities/mentor";

export interface IfetchMentorsUseCase {
  execute(
    page: number,
    experience: string,
    raiting: string,
    salary: string,
    searchData: string
  ): Promise<{ datas: Mentor[]; totalPages: number } | null>;
}
