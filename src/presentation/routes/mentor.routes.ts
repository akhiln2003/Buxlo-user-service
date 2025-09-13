import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchMentorProfileController } from "../controllers/mentor/fetchMentorProfile.controller";
import { UpdateMentorProfileController } from "../controllers/mentor/updateMentorProfile.controller";
import multer from "multer";
import { FetchMentorProfileImageController } from "../controllers/mentor/fetchMentorProfileImage.controller";
import { DeleteMentorProfileImageController } from "../controllers/mentor/deleteMentorProfileImage.controller";
import { fetchprofileDto } from "../dto/mentor/fetchprofile.dto";
import { validateReqBody, validateReqParams } from "@buxlo/common";
import { fetchProfileImageDto } from "../dto/common/fetchprofileimage.dto";
import { deleteprofileimageDto } from "../dto/mentor/deleteprofileimage.dto";
import { MentorVerifyprofileController } from "../controllers/mentor/mentorVerifyprofile.controller";
import { verifyProfileDto } from "../dto/mentor/verifyprofile.dto";

export class MentorRouter {
  private _router: Router;
  private _diContainer: DIContainer;
  private _upload = multer({ storage: multer.memoryStorage() });

  private _fetchprofileController!: FetchMentorProfileController;
  private _updateprofileController!: UpdateMentorProfileController;
  private _fetchProfileImageController!: FetchMentorProfileImageController;
  private _deleteProfileImageController!: DeleteMentorProfileImageController;
  private _mentorVerifyprofileController!: MentorVerifyprofileController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._fetchprofileController = new FetchMentorProfileController(
      this._diContainer.fetchMentorProfileUseCase()
    );
    this._updateprofileController = new UpdateMentorProfileController(
      this._diContainer.updateMentorProfileUseCase()
    );
    this._fetchProfileImageController = new FetchMentorProfileImageController(
      this._diContainer.fetchS3ImageUseCase()
    );
    this._deleteProfileImageController = new DeleteMentorProfileImageController(
      this._diContainer.deleteMentorProfileImageUseCase()
    );
    this._mentorVerifyprofileController = new MentorVerifyprofileController(
      this._diContainer.mentorVerifyprofileUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.get(
      "/fetchprofile/:id",
      validateReqParams(fetchprofileDto),
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
      validateReqParams(deleteprofileimageDto),
      this._deleteProfileImageController.deleteImage
    );
    this._router.put(
      "/verifyprofile",
      this._upload.fields([
        { name: "frontImage", maxCount: 1 },
        { name: "backImage", maxCount: 1 },
      ]),
      validateReqBody(verifyProfileDto),
      this._mentorVerifyprofileController.verify
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
