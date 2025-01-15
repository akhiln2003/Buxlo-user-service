import { Mentor } from "../../../domain/entities/mentor";


export interface IupdateData {
  name?:string,
  bio?:string,
  expertise?:string
  yearsOfExperience?:number
  avatar?:string,
}


export interface IupdateMentorProfileUseCase {
  execute(id: string , updatedData:IupdateData , file: any): Promise<any | Mentor>;
}
