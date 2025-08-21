import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchUserProfileController } from "../controllers/user/fetchUserProfileController";
import multer from "multer";
import { UpdateUserProfileController } from "../controllers/user/updateUserProfileController";
import { FetchUserProfileImageController } from "../controllers/user/fetchUserProfileImageController";
import { DeleteUserProfileImageController } from "../controllers/user/deleteUserProfileImageController";
import { FetchMentorsController } from "../controllers/user/fetchMentorsController";
import { validateReqBody } from "@buxlo/common";
import { fetchProfileImageDto } from "../../zodSchemaDto/input/common/fetchprofileimage.Dto";

export class UserRouter {
  private _router: Router;
  private _diContainer: DIContainer;
  private _upload = multer({ storage: multer.memoryStorage() });

  private _fetchprofileController!: FetchUserProfileController;
  private _updateprofileController!: UpdateUserProfileController;
  private _fetchProfileImageController!: FetchUserProfileImageController;
  private _deleteProfileImageController!: DeleteUserProfileImageController;
  private _fetchMentors!: FetchMentorsController;

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
  }

  public getRouter(): Router {
    return this._router;
  }
}
