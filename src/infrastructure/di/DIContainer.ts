import { FetchProfileImageUseCase } from "../../application/usecase/common/fetchMentorProfileImageUseCase";
import { FetchMentorProfileUseCase } from "../../application/usecase/mentor/FetchMentorProfileUseCase";
import { UpdateMentorProfileUseCase } from "../../application/usecase/mentor/updateMentorUseCase";
import { FetchUserProfileUseCase } from "../../application/usecase/user/FetchUserProfileUseCase";
import { UpdateUserProfileUseCase } from "../../application/usecase/user/updateUserUseCase";
import { Is3Service } from "../@types/Is3Service";
import { MentorRepository } from "../repositories/mentorRepositary";
import { UserRepository } from "../repositories/userRepositary";
import { S3Service } from "../server/s3-client";

export class DIContainer{
    private _userRepository:UserRepository;
    private _mentorRepository:MentorRepository;
    private _s3Service: Is3Service;

    constructor( ){
        this._userRepository = new UserRepository();
        this._mentorRepository = new MentorRepository();
        this._s3Service = new S3Service();
    }


    fetchUserProfileUseCase(){
        return new FetchUserProfileUseCase(this._userRepository);
    }
    fetchMentorProfileUseCase(){
        return new FetchMentorProfileUseCase(this._mentorRepository);
    }
    updateMentorProfileUseCase(){
        return new UpdateMentorProfileUseCase(this._mentorRepository , this._s3Service);
    }
    updateUserProfileUseCase(){
        return new UpdateUserProfileUseCase(this._userRepository , this._s3Service);
    }

    fetchProfileImageUseCase(){
        return new FetchProfileImageUseCase( this._s3Service);
    }
}