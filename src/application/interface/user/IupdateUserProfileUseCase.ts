import { User } from "../../../domain/entities/user";


export interface IupdateData {
  name?:string,
  bio?:string,
  expertise?:string
  yearsOfExperience?:number
  avatar?:string,
}


export interface IupdateUserProfileUseCase {
  execute(id: string , updatedData:IupdateData , file: any): Promise<any | User>;
}
