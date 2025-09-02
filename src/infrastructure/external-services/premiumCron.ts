import cron from "node-cron";
import { UserRepository } from "../repositories/userRepositary";
import { CheckPremiumExpiryUseCase } from "../../application/usecase/common/checkPremiumExpiry";

export class PremiumCron {
  private _checkPremiumExpiryUseCase: CheckPremiumExpiryUseCase;

  constructor() {
    const userRepo = new UserRepository();
    this._checkPremiumExpiryUseCase = new CheckPremiumExpiryUseCase(userRepo);
  }

  start() {
    cron.schedule("0 0 * * *", async () => {
      console.log("🔄 Running Premium Expiry Check...");
      await this._checkPremiumExpiryUseCase.execute();
    });
  }
}
