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
// import { createadvDto } from "../../zodSchemaDto/admin/createadvDto";
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
  private _router: Router;
  private _diContainer: DIContainer;
  private _upload = multer({ storage: multer.memoryStorage() });

  private _createAdvController!: CreateAdvController;
  private _fetchAdvController!: FetchAdvController;
  private _fetchAdvImageController!: FetchAdvImageController;
  private _createTrustedUsUsController!: CreateTrustedUsUsController;
  private _fetchtrustedusController!: FetchtrustedusController;
  private _fetchtrustedusImageController!: FetchtrustedusImageController;
  private _deleteTrustedUsImageController!: DeleteTrustedUsImageController;
  private _deleteAdvImageController!: DdeleteAdvImageController;
  private _editAdvController!: EditAdvController;
  private _fetchVerifyProfileController!: FetchVerifyProfileController;
  private _verifyprofileController!: VerifyprofileController;
  private _fethAadhaarImagesController!: FethAadhaarImagesController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._createAdvController = new CreateAdvController(
      this._diContainer.createAdvUsecase()
    );
    this._fetchAdvController = new FetchAdvController(
      this._diContainer.fetchAdvUseCase()
    );
    this._fetchAdvImageController = new FetchAdvImageController(
      this._diContainer.fetchS3ImageUseCase()
    );
    this._createTrustedUsUsController = new CreateTrustedUsUsController(
      this._diContainer.createTurstedUsUsecase()
    );
    this._fetchtrustedusController = new FetchtrustedusController(
      this._diContainer.fetchtrustedUsUseCase()
    );
    this._fetchtrustedusImageController = new FetchtrustedusImageController(
      this._diContainer.fetchS3ImageUseCase()
    );
    this._deleteTrustedUsImageController = new DeleteTrustedUsImageController(
      this._diContainer.deleteTrustedUsUseCase()
    );
    this._deleteAdvImageController = new DdeleteAdvImageController(
      this._diContainer.deleteAdvUseCase()
    );
    this._editAdvController = new EditAdvController(
      this._diContainer.editAdvUseCase()
    );
    this._fetchVerifyProfileController = new FetchVerifyProfileController(
      this._diContainer.adminFetchVerifyProfilesUseCase()
    );
    this._verifyprofileController = new VerifyprofileController(
      this._diContainer.adminVerifyprofileUseCase()
    );
    this._fethAadhaarImagesController = new FethAadhaarImagesController(
      this._diContainer.fetchS3ImageUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.post(
      "/createadv",
      // validateReqBody(createadvDto),
      this._upload.single("image"),
      this._createAdvController.create
    );
    this._router.get(
      "/fetchadv",
      validateReqQueryParams(fetchtrustedusAndAdvDto),
      this._fetchAdvController.fetchData
    );
    this._router.post(
      "/fetchadvimage",
      validateReqBody(fetchTrustedUsAndAdvImageDto),
      this._fetchAdvImageController.fetchImages
    );
    this._router.delete(
      "/deleteadvimage/:id/:key",
      validateReqParams(deleteAdvAndTrustedUsimageDto),
      this._deleteAdvImageController.deleteImage
    );
    this._router.post(
      "/createtrustedus",
      this._upload.single("image"),
      this._createTrustedUsUsController.create
    );
    this._router.get(
      "/fetchtrustedus",
      validateReqQueryParams(fetchtrustedusAndAdvDto),
      this._fetchtrustedusController.fetchData
    );
    this._router.post(
      "/fetchtrustedusimage",
      validateReqBody(fetchTrustedUsAndAdvImageDto),
      this._fetchtrustedusImageController.fetchImages
    );
    this._router.delete(
      "/deletetrustedusimage/:id/:key",
      validateReqParams(deleteAdvAndTrustedUsimageDto),
      this._deleteTrustedUsImageController.deleteImage
    );
    this._router.post(
      "/editadv",
      this._upload.single("image"),
      this._editAdvController.edit
    );
    this._router.get(
      "/fetchverifyprofiledata",
      validateReqQueryParams(fetchverifyprofileDto),
      this._fetchVerifyProfileController.fetch
    );
    this._router.post(
      "/fetchaadhaarimages",
      validateReqBody(fetchAadhaarImagesDto),
      this._fethAadhaarImagesController.get
    );
    this._router.put(
      "/verifyprofile",
      validateReqBody(verifyProfileDto),
      this._verifyprofileController.verify
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
