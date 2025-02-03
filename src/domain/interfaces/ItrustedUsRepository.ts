import { TrustedUs } from "../entities/trustedUs";

export interface ItrustedUsRepository {
  create(adv: TrustedUs): Promise<TrustedUs>;
  getTrustedUsDetails(page:number):  Promise<{ trustedUs: TrustedUs[]; totalPages: number } | null> ;
  delete( id:string):Promise<void>
}
