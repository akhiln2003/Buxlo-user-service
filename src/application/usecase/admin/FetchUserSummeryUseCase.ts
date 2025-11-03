import { IUserRepository } from "../../../domain/interfaces/IUserrepository";
import { IFetchUserSummeryUseCase, IuserGrowth } from "../../interface/admin/IFetchUserSummeryUseCase";

export class FetchUserSummeryUseCase implements IFetchUserSummeryUseCase {
  constructor(private _userRepository: IUserRepository) {}

  async execute(): Promise<{ totalUsers: number; userGrowth: IuserGrowth[] }> {
    return await this._userRepository.getUserSummery();
  }
}
