import { Adv } from "../entities/adv.entites";

export interface IAdvRepository {
  create(adv: Adv): Promise<Adv>;
  getAdvDetails(
    page: number
  ): Promise<{ advs: Adv[]; totalPages: number } | null>;
  delete(id: string): Promise<string>;
  update(
    id: string,
    data: { title?: string; description?: string; image?: string }
  ): Promise<Adv>;
}
