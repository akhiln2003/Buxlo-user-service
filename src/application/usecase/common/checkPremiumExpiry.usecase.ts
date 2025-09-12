import dayjs from "dayjs";
import { IUserRepository } from "../../../domain/interfaces/IUserrepository";

export class CheckPremiumExpiryUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<void> {
    const now = dayjs().toDate();
    const expiredUsers = await this.userRepository.findExpiredPremiumUsers(now);

    for (const user of expiredUsers) {
      await this.userRepository.updatePremiumStatus(user.id as string);
      console.log(`⚠️ Premium expired for user: ${user.email}`);
    }
  }
}
