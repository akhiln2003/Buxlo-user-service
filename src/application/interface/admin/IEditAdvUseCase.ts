import { Adv } from "../../../domain/entities/adv";

export interface IQueryData {
  title?: string;
  description?: string;
  id?: string;
  currentImage?: string;
  image?:string;
}

export interface IEditAdvUseCase {
  execute(data: IQueryData, file: any): Promise<Adv | any>;
}
