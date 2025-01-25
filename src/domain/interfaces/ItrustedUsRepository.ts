import { TrustedUs } from "../entities/trustedUs";

export interface ItrustedUsRepository {
  create(adv: TrustedUs): Promise<TrustedUs>;
  getTrustedUsDetails(): Promise<TrustedUs[] | null>;
  delete( id:string):Promise<void>
}
