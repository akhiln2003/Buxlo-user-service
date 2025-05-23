import { DeleteMentorProfileImageUseCase } from "../../application/usecase/mentor/DeleteMentorProfileImageUseCase";
import { FetchMentorProfileUseCase } from "../../application/usecase/mentor/FetchMentorProfileUseCase";
import { UpdateMentorProfileUseCase } from "../../application/usecase/mentor/updateMentorUseCase";
import { FetchUserProfileUseCase } from "../../application/usecase/user/FetchUserProfileUseCase";
import { UpdateUserProfileUseCase } from "../../application/usecase/user/updateUserUseCase";
import { Is3Service } from "../@types/Is3Service";
import { MentorRepository } from "../repositories/mentorRepositary";
import { UserRepository } from "../repositories/userRepositary";
import { S3Service } from "../external-services/s3-client";
import { DeleteUserProfileImageUseCase } from "../../application/usecase/user/DeleteUserProfileImageUseCase";
import { NodeMailerService } from "../external-services/nodeMailerService";
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
import { ImentorVerifyprofileUseCase } from "../../application/interface/mentor/ImentorVerifyprofileUseCase";
import { MentorVerifyprofileUseCase } from "../../application/usecase/mentor/MentorVerifyprofileUseCase";
import { IadminVerifyprofileUseCase } from "../../application/interface/admin/IadminVerifyprofileUseCase";
import { AdminVerifyprofileUseCase } from "../../application/usecase/admin/AdminVerifyprofileUseCase";
import { IadminFetchVerifyProfilesUseCase } from "../../application/interface/admin/IadminFetchVerifyProfiles";
import { AdminFetchVerifyProfilesUseCase } from "../../application/usecase/admin/AdminFetchVerifyProfilesUseCase";
import { UserUpdatedProducer } from "../MessageBroker/kafka/producer/userUpdateProducer";
import { messageBroker } from "../MessageBroker/config";
import { IfetchMentorsUseCase } from "../../application/interface/user/IfetchMentorsUseCase";
import { FetchMentorsUseCase } from "../../application/usecase/user/fetchMentorsUseCase";

export class DIContainer {
  private _userRepository: UserRepository;
  private _mentorRepository: MentorRepository;
  private _s3Service: Is3Service;
  private _nodeMailerService: NodeMailerService;
  private _advRepository: AdvRepository;
  private _trustedUsRepository: TrustedUsRepository;
  private _userUpdatedProducer: UserUpdatedProducer;

  constructor() {
    this._userRepository = new UserRepository();
    this._mentorRepository = new MentorRepository();
    this._s3Service = new S3Service();
    this._nodeMailerService = new NodeMailerService();
    this._advRepository = new AdvRepository();
    this._trustedUsRepository = new TrustedUsRepository();
    this._userUpdatedProducer = new UserUpdatedProducer(
      messageBroker.getKafkaClient().producer
    );
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
      this._s3Service,
      this._userUpdatedProducer
    );
  }
  updateUserProfileUseCase() {
    return new UpdateUserProfileUseCase(
      this._userRepository,
      this._s3Service,
      this._userUpdatedProducer
    );
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
  editAdvUseCase() {
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

  mentorVerifyprofileUseCase(): ImentorVerifyprofileUseCase {
    return new MentorVerifyprofileUseCase(
      this._mentorRepository,
      this._s3Service
    );
  }

  adminFetchVerifyProfilesUseCase(): IadminFetchVerifyProfilesUseCase {
    return new AdminFetchVerifyProfilesUseCase(this._mentorRepository);
  }

  adminVerifyprofileUseCase(): IadminVerifyprofileUseCase {
    return new AdminVerifyprofileUseCase(
      this._mentorRepository,
      this._s3Service
    );
  }

  fetchMentorsUseCase():IfetchMentorsUseCase{
    return new FetchMentorsUseCase(this._mentorRepository);
  }
}
