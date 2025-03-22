import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchUserProfileController } from "../controllers/user/fetchUserProfileController";
import multer from "multer";
import { UpdateUserProfileController } from "../controllers/user/updateUserProfileController";
import { FetchUserProfileImageController } from "../controllers/user/fetchUserProfileImageController";
import { DeleteUserProfileImageController } from "../controllers/user/deleteUserProfileImageController";
import { FetchMentorsController } from "../controllers/user/fetchMentorsController";
import { validateReqBody } from "@buxlo/common";
import { fetchProfileImageDto } from "../../zodSchemaDto/common/fetchprofileimage.Dto";

export class UserRouter {
  private router: Router;
  private diContainer: DIContainer;
  private upload = multer({ storage: multer.memoryStorage() });

  private fetchprofileController!: FetchUserProfileController;
  private updateprofileController!: UpdateUserProfileController;
  private fetchProfileImageController!: FetchUserProfileImageController;
  private deleteProfileImageController!: DeleteUserProfileImageController;
  private fetchMentors!: FetchMentorsController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    this.fetchprofileController = new FetchUserProfileController(
      this.diContainer.fetchUserProfileUseCase()
    );
    this.updateprofileController = new UpdateUserProfileController(
      this.diContainer.updateUserProfileUseCase()
    );
    this.fetchProfileImageController = new FetchUserProfileImageController(
      this.diContainer.fetchS3ImageUseCase()
    );
    this.deleteProfileImageController = new DeleteUserProfileImageController(
      this.diContainer.deleteUserProfileImageUseCase()
    );
    this.fetchMentors = new FetchMentorsController(
      this.diContainer.fetchMentorsUseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.get("/fetchprofile/:id", this.fetchprofileController.fetchData);
    this.router.put(
      "/updateprofile",
      this.upload.single("newProfileImage"),
      this.updateprofileController.update
    );
    this.router.post(
      "/fetchprofileimage",
      validateReqBody(fetchProfileImageDto),
      this.fetchProfileImageController.fetchImage
    );
    this.router.delete(
      "/deleteprofileimage/:id/:key",
      this.deleteProfileImageController.deleteImage
    );
    this.router.get("/fetchmentors", this.fetchMentors.fetchData);
  }

  public getRouter(): Router {
    return this.router;
  }
}
