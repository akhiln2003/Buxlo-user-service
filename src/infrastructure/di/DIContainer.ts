import { DeleteMentorProfileImageUseCase } from "../../application/usecase/mentor/DeleteMentorProfileImageUseCase";
import { FetchProfileImageUseCase } from "../../application/usecase/common/fetchProfileImageUseCase";
import { FetchMentorProfileUseCase } from "../../application/usecase/mentor/FetchMentorProfileUseCase";
import { UpdateMentorProfileUseCase } from "../../application/usecase/mentor/updateMentorUseCase";
import { FetchUserProfileUseCase } from "../../application/usecase/user/FetchUserProfileUseCase";
import { UpdateUserProfileUseCase } from "../../application/usecase/user/updateUserUseCase";
import { Is3Service } from "../@types/Is3Service";
import { MentorRepository } from "../repositories/mentorRepositary";
import { UserRepository } from "../repositories/userRepositary";
import { S3Service } from "../server/s3-client";
import { DeleteUserProfileImageUseCase } from "../../application/usecase/user/DeleteUserProfileImageUseCase";
import { NodeMailerService } from "../server/nodeMailerService";
import { SendContactUsEmailUseCase } from "../../application/usecase/common/constactUsEmailUseCase";
import { IsendContactUsEmailUseCase } from "../../application/interface/common/IemailService";
import { CreateTurstedUsUsecase } from "../../application/usecase/admin/CreateTurstedUsUsecase";
import { CreateAdvUsecase } from "../../application/usecase/admin/CreateAdvUsecase";
import { AdvRepository } from "../repositories/advRepositary";
import { TrustedUsRepository } from "../repositories/trustedUsRepositary";
import { FetchtrustedUsUseCase } from "../../application/usecase/admin/fetchtrustedUsUseCase";
import { FetchS3ImageUseCase } from "../../application/usecase/common/fetchS3ImageUseCase";
import { DeleteTrustedUsUseCase } from "../../application/usecase/admin/DeleteTrustedUsUseCase";
import { FetchAdvUseCase } from "../../application/usecase/admin/fetchAdvUseCase";
import { DeleteAdvUseCase } from "../../application/usecase/admin/DeleteAdvUseCase";
import { EditAdvUseCase } from "../../application/usecase/admin/EditAdvUseCase";

export class DIContainer {
  private _userRepository: UserRepository;
  private _mentorRepository: MentorRepository;
  private _s3Service: Is3Service;
  private _nodeMailerService: NodeMailerService;
  private _advRepository: AdvRepository;
  private _trustedUsRepository: TrustedUsRepository;

  constructor() {
    this._userRepository = new UserRepository();
    this._mentorRepository = new MentorRepository();
    this._s3Service = new S3Service();
    this._nodeMailerService = new NodeMailerService();
    this._advRepository = new AdvRepository();
    this._trustedUsRepository = new TrustedUsRepository();
  }

  fetchUserProfileUseCase() {
    return new FetchUserProfileUseCase(this._userRepository);
  }
  fetchtrustedUsUseCase() {
    return new FetchtrustedUsUseCase(this._trustedUsRepository);
  }
  fetchAdvUseCase() {
    return new FetchAdvUseCase(this._advRepository);
  }
  fetchMentorProfileUseCase() {
    return new FetchMentorProfileUseCase(this._mentorRepository);
  }
  updateMentorProfileUseCase() {
    return new UpdateMentorProfileUseCase(
      this._mentorRepository,
      this._s3Service
    );
  }
  updateUserProfileUseCase() {
    return new UpdateUserProfileUseCase(this._userRepository, this._s3Service);
  }

  fetchProfileImageUseCase() {
    return new FetchProfileImageUseCase(this._s3Service);
  }

  fetchS3ImageUseCase() {
    return new FetchS3ImageUseCase(this._s3Service);
  }

  deleteMentorProfileImageUseCase() {
    return new DeleteMentorProfileImageUseCase(
      this._mentorRepository,
      this._s3Service
    );
  }

  deleteUserProfileImageUseCase() {
    return new DeleteUserProfileImageUseCase(
      this._userRepository,
      this._s3Service
    );
  }

  deleteAdvUseCase() {
    return new DeleteAdvUseCase(this._advRepository, this._s3Service);
  }
  editAdvUseCase(){
    return new EditAdvUseCase(this._advRepository, this._s3Service);
  }

  deleteTrustedUsUseCase() {
    return new DeleteTrustedUsUseCase(
      this._trustedUsRepository,
      this._s3Service
    );
  }

  createTurstedUsUsecase() {
    return new CreateTurstedUsUsecase(
      this._s3Service,
      this._trustedUsRepository
    );
  }
  createAdvUsecase() {
    return new CreateAdvUsecase(this._s3Service, this._advRepository);
  }

  sendContactUsEmailUseCase(): IsendContactUsEmailUseCase {
    return new SendContactUsEmailUseCase(this._nodeMailerService);
  }

}
