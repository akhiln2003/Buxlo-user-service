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
import { FetchS3ImageUseCase } from "../../application/usecase/common/fetchS3Image.useCase";
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
import { FeedbackRepository } from "../repositories/feedbackRepositary";
import { ISendFeedbackUseCase } from "../../application/interface/user/ISendFeedbackUseCase";
import { SendFeedbackUseCase } from "../../application/usecase/user/sendFeedback.useCase";
import { IFetchFeedbackUseCase } from "../../application/interface/common/IFetchFeedbackUseCase";
import { FetchFeedbackUseCase } from "../../application/usecase/common/fetchFeedback.useCase";
import { IDisLikeAndLikeUseCase } from "../../application/interface/user/IDisLikeAndLikeUseCase";
import { DisLikeAndLikeUseCase } from "../../application/usecase/user/DisLikeAndLikeUseCase";
import { FetchUserSummeryUseCase } from "../../application/usecase/admin/FetchUserSummeryUseCase";
import { IFetchUserSummeryUseCase } from "../../application/interface/admin/IFetchUserSummeryUseCase";
import { FetchMentorSummeryUseCase } from "../../application/usecase/admin/FetchMentorSummeryUseCase";
import { IFetchMentorSummeryUseCase } from "../../application/interface/admin/IFetchMentorSummeryUseCase";

export class DIContainer {
  private _userRepository: UserRepository;
  private _mentorRepository: MentorRepository;
  private _s3Service: IS3Service;
  private _nodeMailerService: NodeMailerService;
  private _userUpdatedProducer: UserUpdatedProducer;
  private _feedbackRepository: FeedbackRepository;

  constructor() {
    this._userRepository = new UserRepository();
    this._mentorRepository = new MentorRepository();
    this._s3Service = new S3Service();
    this._nodeMailerService = new NodeMailerService();
    this._feedbackRepository = new FeedbackRepository();
    this._userUpdatedProducer = new UserUpdatedProducer(
      messageBroker.getKafkaClient().producer
    );
  }

  fetchUserProfileUseCase() {
    return new FetchUserProfileUseCase(this._userRepository);
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

  sendFeedbackUseCase(): ISendFeedbackUseCase {
    return new SendFeedbackUseCase(this._feedbackRepository);
  }

  fetchFeedbackUseCase(): IFetchFeedbackUseCase {
    return new FetchFeedbackUseCase(this._feedbackRepository);
  }

  disLikeAndLikeUseCase(): IDisLikeAndLikeUseCase {
    return new DisLikeAndLikeUseCase(this._feedbackRepository);
  }

  fetchUserSummeryUseCase(): IFetchUserSummeryUseCase {
    return new FetchUserSummeryUseCase(this._userRepository);
  }

   fetchMentorSummeryUseCase(): IFetchMentorSummeryUseCase {
    return new FetchMentorSummeryUseCase(this._mentorRepository);
  }
}
