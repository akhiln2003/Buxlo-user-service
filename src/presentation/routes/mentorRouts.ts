import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchMentorProfileController } from "../controllers/mentor/fetchMentorProfileController";
import { UpdateMentorProfileController } from "../controllers/mentor/updateMentorProfileController";
import multer from "multer";
import { FetchMentorProfileImageController } from "../controllers/mentor/fetchMentorProfileImageController";
import { DeleteMentorProfileImageController } from "../controllers/mentor/deleteMentorProfileImageController";
import { fetchprofileDto } from "../../zodSchemaDto/mentor/fetchprofile.Dto";
import { validateReqBody, validateReqParams } from "@buxlo/common";
import { fetchProfileImageDto } from "../../zodSchemaDto/common/fetchprofileimage.Dto";
import { deleteprofileimageDto } from "../../zodSchemaDto/mentor/deleteprofileimage.Dto";
import { MentorVerifyprofileController } from "../controllers/mentor/mentorVerifyprofileController";
import { verifyProfileDto } from "../../zodSchemaDto/mentor/verifyprofile.Dto";

export class MentorRouter {
  private router: Router;
  private diContainer: DIContainer;
  private upload = multer({ storage: multer.memoryStorage() });

  private fetchprofileController!: FetchMentorProfileController;
  private updateprofileController!: UpdateMentorProfileController;
  private fetchProfileImageController!: FetchMentorProfileImageController;
  private deleteProfileImageController!: DeleteMentorProfileImageController;
  private mentorVerifyprofileController!: MentorVerifyprofileController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    this.fetchprofileController = new FetchMentorProfileController(
      this.diContainer.fetchMentorProfileUseCase()
    );
    this.updateprofileController = new UpdateMentorProfileController(
      this.diContainer.updateMentorProfileUseCase()
    );
    this.fetchProfileImageController = new FetchMentorProfileImageController(
      this.diContainer.fetchS3ImageUseCase()
    );
    this.deleteProfileImageController = new DeleteMentorProfileImageController(
      this.diContainer.deleteMentorProfileImageUseCase()
    );
    this.mentorVerifyprofileController = new MentorVerifyprofileController(
      this.diContainer.mentorVerifyprofileUseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.get(
      "/fetchprofile/:id",
      validateReqParams(fetchprofileDto),
      this.fetchprofileController.fetchData
    );
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
      validateReqParams(deleteprofileimageDto),
      this.deleteProfileImageController.deleteImage
    );
    this.router.put(
      "/verifyprofile",
      this.upload.fields([
        { name: "frontImage", maxCount: 1 },
        { name: "backImage", maxCount: 1 },
      ]),
      validateReqBody(verifyProfileDto),
      this.mentorVerifyprofileController.verify
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
