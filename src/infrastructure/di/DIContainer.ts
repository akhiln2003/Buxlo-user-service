import { DeleteMentorProfileImageUseCase } from "../../application/usecase/mentor/DeleteMentorProfileImage.useCase";
import { FetchMentorProfileUseCase } from "../../application/usecase/mentor/FetchMentorProfile.useCase";
import { UpdateMentorProfileUseCase } from "../../application/usecase/mentor/updateMentor.useCase";
import { FetchUserProfileUseCase } from "../../application/usecase/user/FetchUserProfile.useCase";
import { UpdateUserProfileUseCase } from "../../application/usecase/user/updateUser.useCase";
import { IS3Service } from "../@types/IS3Service";
import { MentorRepository } from "../repositories/mentorRepositary";
import { UserRepository } from "../repositories/userRepositary";
import { S3Service } from "../external-services/s3-client";
import { DeleteUserProfileImageUseCase } from "../../application/usecase/user/DeleteUserProfileImage.useCase";
import { NodeMailerService } from "../external-services/nodeMailerService";
import { SendContactUsEmailUseCase } from "../../application/usecase/common/constactUsEmail.useCase";
import { ISendContactUsEmailUseCase } from "../../application/interface/common/IEmailService";
import { CreateTurstedUsUsecase } from "../../application/usecase/admin/CreateTurstedUs.usecase";
import { CreateAdvUsecase } from "../../application/usecase/admin/CreateAdv.usecase";
import { AdvRepository } from "../repositories/advRepositary";
import { TrustedUsRepository } from "../repositories/trustedUsRepositary";
import { FetchtrustedUsUseCase } from "../../application/usecase/admin/fetchtrustedUs.useCase";
import { FetchS3ImageUseCase } from "../../application/usecase/common/fetchS3Image.useCase";
import { DeleteTrustedUsUseCase } from "../../application/usecase/admin/DeleteTrustedUs.useCase";
import { FetchAdvUseCase } from "../../application/usecase/admin/fetchAdv.useCase";
import { DeleteAdvUseCase } from "../../application/usecase/admin/DeleteAdv.useCase";
import { EditAdvUseCase } from "../../application/usecase/admin/EditAdv.useCase";
import { IMentorVerifyprofileUseCase } from "../../application/interface/mentor/IMentorVerifyprofileUseCase";
import { MentorVerifyprofileUseCase } from "../../application/usecase/mentor/MentorVerifyprofile.useCase";
import { IAdminVerifyprofileUseCase } from "../../application/interface/admin/IAdminVerifyprofileUseCase";
import { AdminVerifyprofileUseCase } from "../../application/usecase/admin/AdminVerifyprofile.useCase";
import { IAdminFetchVerifyProfilesUseCase } from "../../application/interface/admin/IAdminFetchVerifyProfiles";
import { AdminFetchVerifyProfilesUseCase } from "../../application/usecase/admin/AdminFetchVerifyProfiles.useCase";
import { UserUpdatedProducer } from "../MessageBroker/kafka/producer/userUpdateProducer";
import { messageBroker } from "../MessageBroker/config";
import { IFetchMentorsUseCase } from "../../application/interface/user/IFetchMentorsUseCase";
import { FetchMentorsUseCase } from "../../application/usecase/user/fetchMentors.useCase";

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
