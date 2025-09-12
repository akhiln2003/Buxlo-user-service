import { IAdvRepository } from "../../../domain/interfaces/IAdvRepository";
import {
  AdvMapper,
  AdvResponseDto,
} from "../../../domain/zodSchemaDto/output/adbResponse.dto";
import { IFetchAdvUseCase } from "../../interface/admin/IFetchAdvUseCase";

export class FetchAdvUseCase implements IFetchAdvUseCase {
  constructor(private _advRepository: IAdvRepository) {}

  async execute(
    page: number
  ): Promise<{ advs: AdvResponseDto[]; totalPages: number } | null> {
    const data = await this._advRepository.getAdvDetails(page);
    const advs = data?.advs.length
      ? data.advs.map((adv) => AdvMapper.toDto(adv))
      : [];
    return { advs, totalPages: data?.totalPages as number };
  }
}
