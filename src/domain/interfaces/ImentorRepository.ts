import { ImentorUpdateData } from "../../application/interface/mentor/IupdateMentorProfileUseCase";
import { Mentor } from "../entities/mentor";

export interface ImentorRepository{
    updateMentorProfile(userId: string , query:ImentorUpdateData): Promise<Mentor | null>;
    getMentorDetails(userId: string): Promise<Mentor | null>;
    updateMentorProfileData(userId: string, data: { name?: string, avatar?: string }): Promise<Mentor | null>;
    deleteMentorProfileData( userId:string , data:{avatar?:string}):Promise<Mentor|null>
}