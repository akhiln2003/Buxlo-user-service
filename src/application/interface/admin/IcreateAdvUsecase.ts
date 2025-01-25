import { Adv } from "../../../domain/entities/adv";

export interface IcreateAdvData {
   image: string,
   title: string,
   description: string,
   isDelete?:boolean,
   id?: string,
}

export interface IcreateAdvUsecase {
  execute(updatedData: IcreateAdvData, file: any): Promise<Adv | any>;
}
