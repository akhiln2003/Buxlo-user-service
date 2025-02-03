import { Adv } from "../entities/adv";

export interface IadvRepository {
  create(adv: Adv): Promise<Adv>;
  getAdvDetails(page:number): Promise<{ advs: Adv[]; totalPages: number } | null> 
  delete(id: string): Promise<void>;
  update(id: string, data: { title?: string; description?:string; image?: string }):Promise< Adv | any>;
}
