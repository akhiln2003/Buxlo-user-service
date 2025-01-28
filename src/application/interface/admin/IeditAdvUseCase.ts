import { Adv } from "../../../domain/entities/adv";

export interface IqueryData {
  title?: string;
  description?: string;
  id?: string;
  currentImage?: string;
  image?:string;
}

export interface IeditAdvUseCase {
  execute(data: IqueryData, file: any): Promise<Adv | any>;
}
