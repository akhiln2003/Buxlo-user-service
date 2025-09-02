import { Adv } from "../../../domain/entities/adv";

export interface ICreateAdvData {
   image: string,
   title: string,
   description: string,
   id?: string,
}

export interface ICreateAdvUsecase {
  execute(updatedData: ICreateAdvData, file: any): Promise<Adv | any>;
}
