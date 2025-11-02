import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchUserProfileController } from "../controllers/user/fetchUserProfile.controller";
import multer from "multer";
import { UpdateUserProfileController } from "../controllers/user/updateUserProfile.controller";
import { FetchUserProfileImageController } from "../controllers/user/fetchUserProfileImage.controller";
import { DeleteUserProfileImageController } from "../controllers/user/deleteUserProfileImage.controller";
import { FetchMentorsController } from "../controllers/user/fetchMentors.controller";
import { validateReqBody } from "@buxlo/common";
import { fetchProfileImageDto } from "../dto/common/fetchprofileimage.dto";
import { SendFeedbackController } from "../controllers/user/sendFeedback.controller";
import { sendFeedbackDto } from "../dto/user/sendfeedback.dto";
import { disLikeAndLikeDto } from "../dto/user/dislikeAndLikedto";
import { DisLikeAndLikeController } from "../controllers/user/disLikeAndLike.controller";

export class UserRouter {
  private _router: Router;
  private _diContainer: DIContainer;
  private _upload = multer({ storage: multer.memoryStorage() });
  private _fetchprofileController!: FetchUserProfileController;
  private _updateprofileController!: UpdateUserProfileController;
  private _fetchProfileImageController!: FetchUserProfileImageController;
  private _deleteProfileImageController!: DeleteUserProfileImageController;
  private _fetchMentors!: FetchMentorsController;
  private _sendFeedbackController!: SendFeedbackController;
  private _disLikeAndLikeController!: DisLikeAndLikeController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._fetchprofileController = new FetchUserProfileController(
      this._diContainer.fetchUserProfileUseCase()
    );
    this._updateprofileController = new UpdateUserProfileController(
      this._diContainer.updateUserProfileUseCase()
    );
    this._fetchProfileImageController = new FetchUserProfileImageController(
      this._diContainer.fetchS3ImageUseCase()
    );
    this._deleteProfileImageController = new DeleteUserProfileImageController(
      this._diContainer.deleteUserProfileImageUseCase()
    );
    this._fetchMentors = new FetchMentorsController(
      this._diContainer.fetchMentorsUseCase()
    );
    this._sendFeedbackController = new SendFeedbackController(
      this._diContainer.sendFeedbackUseCase()
    );

    this._disLikeAndLikeController = new DisLikeAndLikeController(
      this._diContainer.disLikeAndLikeUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.get(
      "/fetchprofile/:id",
      this._fetchprofileController.fetchData
    );
    this._router.put(
      "/updateprofile",
      this._upload.single("newProfileImage"),
      this._updateprofileController.update
    );
    this._router.post(
      "/fetchprofileimage",
      validateReqBody(fetchProfileImageDto),
      this._fetchProfileImageController.fetchImage
    );
    this._router.delete(
      "/deleteprofileimage/:id/:key",
      this._deleteProfileImageController.deleteImage
    );
    this._router.get("/fetchmentors", this._fetchMentors.fetchData);
    this._router.post(
      "/sendfeedback",
      validateReqBody(sendFeedbackDto),
      this._sendFeedbackController.create
    );

    this._router.patch(
      "/dislikeandlike",
      validateReqBody(disLikeAndLikeDto),
      this._disLikeAndLikeController.update
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
