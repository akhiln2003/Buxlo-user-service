import { TrustedUs } from "../entities/trustedUs";

export interface ITrustedUsRepository {
  create(adv: TrustedUs): Promise<TrustedUs>;
  getTrustedUsDetails(page:number):  Promise<{ trustedUs: TrustedUs[]; totalPages: number } | null> ;
  delete( id:string):Promise<string>
}
