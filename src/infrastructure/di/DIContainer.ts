import { DeleteMentorProfileImageUseCase } from "../../application/usecase/mentor/DeleteMentorProfileImageUseCase";
import { FetchMentorProfileUseCase } from "../../application/usecase/mentor/FetchMentorProfileUseCase";
import { UpdateMentorProfileUseCase } from "../../application/usecase/mentor/updateMentorUseCase";
import { FetchUserProfileUseCase } from "../../application/usecase/user/FetchUserProfileUseCase";
import { UpdateUserProfileUseCase } from "../../application/usecase/user/updateUserUseCase";
import { IS3Service } from "../@types/IS3Service";
import { MentorRepository } from "../repositories/mentorRepositary";
import { UserRepository } from "../repositories/userRepositary";
import { S3Service } from "../external-services/s3-client";
import { DeleteUserProfileImageUseCase } from "../../application/usecase/user/DeleteUserProfileImageUseCase";
import { NodeMailerService } from "../external-services/nodeMailerService";
import { SendContactUsEmailUseCase } from "../../application/usecase/common/constactUsEmailUseCase";
import { ISendContactUsEmailUseCase } from "../../application/interface/common/IEmailService";
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
import { IMentorVerifyprofileUseCase } from "../../application/interface/mentor/IMentorVerifyprofileUseCase";
import { MentorVerifyprofileUseCase } from "../../application/usecase/mentor/MentorVerifyprofileUseCase";
import { IAdminVerifyprofileUseCase } from "../../application/interface/admin/IAdminVerifyprofileUseCase";
import { AdminVerifyprofileUseCase } from "../../application/usecase/admin/AdminVerifyprofileUseCase";
import { IAdminFetchVerifyProfilesUseCase } from "../../application/interface/admin/IAdminFetchVerifyProfiles";
import { AdminFetchVerifyProfilesUseCase } from "../../application/usecase/admin/AdminFetchVerifyProfilesUseCase";
import { UserUpdatedProducer } from "../MessageBroker/kafka/producer/userUpdateProducer";
import { messageBroker } from "../MessageBroker/config";
import { IFetchMentorsUseCase } from "../../application/interface/user/IFetchMentorsUseCase";
import { FetchMentorsUseCase } from "../../application/usecase/user/fetchMentorsUseCase";

export class DIContainer {
  private _userRepository: UserRepository;
  private _mentorRepository: MentorRepository;
  private _s3Service: IS3Service;
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

  sendContactUsEmailUseCase(): ISendContactUsEmailUseCase {
    return new SendContactUsEmailUseCase(this._nodeMailerService);
  }

  mentorVerifyprofileUseCase(): IMentorVerifyprofileUseCase {
    return new MentorVerifyprofileUseCase(
      this._mentorRepository,
      this._s3Service
    );
  }

  adminFetchVerifyProfilesUseCase(): IAdminFetchVerifyProfilesUseCase {
    return new AdminFetchVerifyProfilesUseCase(this._mentorRepository);
  }

  adminVerifyprofileUseCase(): IAdminVerifyprofileUseCase {
    return new AdminVerifyprofileUseCase(
      this._mentorRepository,
      this._s3Service
    );
  }

  fetchMentorsUseCase(): IFetchMentorsUseCase {
    return new FetchMentorsUseCase(this._mentorRepository);
  }
}
