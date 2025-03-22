import { Mentor } from "../../../domain/entities/mentor";

export interface IfetchMentorsUseCase {
  execute(
    page: number,
    availability: "true" | "false" | "all" ,
    searchData?: string
  ): Promise<{ datas: Mentor[]; totalPages: number } | null>;
}
