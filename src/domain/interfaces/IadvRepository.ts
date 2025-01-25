import { Adv } from "../entities/adv";

export interface IadvRepository{
    create(adv: Adv): Promise<Adv>;
    getAdvDetails(): Promise<Adv[] | null>;
    delete( id:string):Promise<void>
}