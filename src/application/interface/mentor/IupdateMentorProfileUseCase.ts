import { Mentor } from "../../../domain/entities/mentor";


export interface ImentorUpdateData {
  name?:string,
  bio?:string,
  expertise?:string
  yearsOfExperience?:number
  avatar?:string,
}


export interface IupdateMentorProfileUseCase {
  execute(id: string , updatedData:ImentorUpdateData , file: any , currentProfileImage: string | undefined): Promise<any | Mentor>;
}
