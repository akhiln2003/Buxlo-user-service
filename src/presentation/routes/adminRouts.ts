import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import multer from "multer";
import { CreateTrustedUsUsController } from "../controllers/admin/createTrustedUsUsController";
import { FetchtrustedusController } from "../controllers/admin/fetchtrustedusController";
import { FetchtrustedusImageController } from "../controllers/admin/fetchtrustedusImageController";
import { DeleteTrustedUsImageController } from "../controllers/admin/deleteTrustedUsImageController";
import { DdeleteAdvImageController } from "../controllers/admin/deleteAdvImageController";
import { CreateAdvController } from "../controllers/admin/createAdvController";
import { FetchAdvController } from "../controllers/admin/fetchAdvController";
import { FetchAdvImageController } from "../controllers/admin/fetchAdvImageController";
import { EditAdvController } from "../controllers/admin/editAdvController";
import {
  validateReqBody,
  validateReqParams,
  validateReqQueryParams,
} from "@buxlo/common";
import { createadvDto } from "../../zodSchemaDto/admin/createadvDto";
import { fetchTrustedUsAndAdvImageDto } from "../../zodSchemaDto/admin/fetchadvimageDto";
import { fetchtrustedusAndAdvDto } from "../../zodSchemaDto/admin/fetchtrustedusAndAdvDto";
import { verifyProfileDto } from "../../zodSchemaDto/admin/verifyProfileDto";
import { deleteAdvAndTrustedUsimageDto } from "../../zodSchemaDto/admin/deleteAdvAndTrustedUsimageDto";
import { VerifyprofileController } from "../controllers/admin/verifyprofileController";
import { fetchverifyprofileDto } from "../../zodSchemaDto/admin/listverifyprofileDto";
import { FetchVerifyProfileController } from "../controllers/admin/fetchVerifyProfileController";
import { FethAadhaarImagesController } from "../controllers/admin/fethAadhaarImagesController";
import { fetchAadhaarImagesDto } from "../../zodSchemaDto/admin/fethAadhaarImagesDto";

export class AdminRouter {
  private router: Router;
  private diContainer: DIContainer;
  private upload = multer({ storage: multer.memoryStorage() });

  private createAdvController!: CreateAdvController;
  private fetchAdvController!: FetchAdvController;
  private fetchAdvImageController!: FetchAdvImageController;
  private createTrustedUsUsController!: CreateTrustedUsUsController;
  private fetchtrustedusController!: FetchtrustedusController;
  private fetchtrustedusImageController!: FetchtrustedusImageController;
  private deleteTrustedUsImageController!: DeleteTrustedUsImageController;
  private deleteAdvImageController!: DdeleteAdvImageController;
  private editAdvController!: EditAdvController;
  private fetchVerifyProfileController!: FetchVerifyProfileController;
  private verifyprofileController!: VerifyprofileController;
  private fethAadhaarImagesController!: FethAadhaarImagesController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    this.createAdvController = new CreateAdvController(
      this.diContainer.createAdvUsecase()
    );
    this.fetchAdvController = new FetchAdvController(
      this.diContainer.fetchAdvUseCase()
    );
    this.fetchAdvImageController = new FetchAdvImageController(
      this.diContainer.fetchS3ImageUseCase()
    );
    this.createTrustedUsUsController = new CreateTrustedUsUsController(
      this.diContainer.createTurstedUsUsecase()
    );
    this.fetchtrustedusController = new FetchtrustedusController(
      this.diContainer.fetchtrustedUsUseCase()
    );
    this.fetchtrustedusImageController = new FetchtrustedusImageController(
      this.diContainer.fetchS3ImageUseCase()
    );
    this.deleteTrustedUsImageController = new DeleteTrustedUsImageController(
      this.diContainer.deleteTrustedUsUseCase()
    );
    this.deleteAdvImageController = new DdeleteAdvImageController(
      this.diContainer.deleteAdvUseCase()
    );
    this.editAdvController = new EditAdvController(
      this.diContainer.editAdvUseCase()
    );
    this.fetchVerifyProfileController = new FetchVerifyProfileController(
      this.diContainer.adminFetchVerifyProfilesUseCase()
    );
    this.verifyprofileController = new VerifyprofileController(
      this.diContainer.adminVerifyprofileUseCase()
    );
    this.fethAadhaarImagesController = new FethAadhaarImagesController(
      this.diContainer.fetchS3ImageUseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.post(
      "/createadv",
      validateReqBody(createadvDto),
      this.upload.single("image"),
      this.createAdvController.create
    );
    this.router.get(
      "/fetchadv",
      validateReqQueryParams(fetchtrustedusAndAdvDto),
      this.fetchAdvController.fetchData
    );
    this.router.post(
      "/fetchadvimage",
      validateReqBody(fetchTrustedUsAndAdvImageDto),
      this.fetchAdvImageController.fetchImages
    );
    this.router.delete(
      "/deleteadvimage/:id/:key",
      validateReqParams(deleteAdvAndTrustedUsimageDto),
      this.deleteAdvImageController.deleteImage
    );
    this.router.post(
      "/createtrustedus",
      this.upload.single("image"),
      this.createTrustedUsUsController.create
    );
    this.router.get(
      "/fetchtrustedus",
      validateReqQueryParams(fetchtrustedusAndAdvDto),
      this.fetchtrustedusController.fetchData
    );
    this.router.post(
      "/fetchtrustedusimage",
      validateReqBody(fetchTrustedUsAndAdvImageDto),
      this.fetchtrustedusImageController.fetchImages
    );
    this.router.delete(
      "/deletetrustedusimage/:id/:key",
      validateReqParams(deleteAdvAndTrustedUsimageDto),
      this.deleteTrustedUsImageController.deleteImage
    );
    this.router.post(
      "/editadv",
      this.upload.single("image"),
      this.editAdvController.edit
    );
    this.router.get(
      "/fetchverifyprofiledata",
      validateReqQueryParams(fetchverifyprofileDto),
      this.fetchVerifyProfileController.fetch
    );
    this.router.post(
      "/fetchaadhaarimages",
      validateReqBody(fetchAadhaarImagesDto),
      this.fethAadhaarImagesController.get
    );
    this.router.put(
      "/verifyprofile",
      validateReqBody(verifyProfileDto),
      this.verifyprofileController.verify
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
