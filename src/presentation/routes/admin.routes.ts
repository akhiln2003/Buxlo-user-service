import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import multer from "multer";
import { CreateTrustedUsUsController } from "../controllers/admin/createTrustedUsUs.controller";
import { FetchtrustedusController } from "../controllers/admin/fetchtrustedus.controller";
import { FetchtrustedusImageController } from "../controllers/admin/fetchtrustedusImage.controller";
import { DeleteTrustedUsImageController } from "../controllers/admin/deleteTrustedUsImage.controller";
import { DdeleteAdvImageController } from "../controllers/admin/deleteAdvImage.controller";
import { CreateAdvController } from "../controllers/admin/createAdv.controller";
import { FetchAdvController } from "../controllers/admin/fetchAdv.controller";
import { FetchAdvImageController } from "../controllers/admin/fetchAdvImage.controller";
import { EditAdvController } from "../controllers/admin/editAdv.controller";
import {
  validateReqBody,
  validateReqParams,
  validateReqQueryParams,
} from "@buxlo/common";
import { fetchTrustedUsAndAdvImageDto } from "../../domain/zodSchemaDto/input/admin/fetchadvimage.dto";
import { fetchtrustedusAndAdvDto } from "../../domain/zodSchemaDto/input/admin/fetchtrustedusAndAdv.dto";
import { verifyProfileDto } from "../../domain/zodSchemaDto/input/admin/verifyProfile.dto";
import { deleteAdvAndTrustedUsimageDto } from "../../domain/zodSchemaDto/input/admin/deleteAdvAndTrustedUsimage.dto";
import { VerifyprofileController } from "../controllers/admin/verifyprofile.controller";
import { fetchverifyprofileDto } from "../../domain/zodSchemaDto/input/admin/listverifyprofile.dto";
import { FetchVerifyProfileController } from "../controllers/admin/fetchVerifyProfile.controller";
import { FethAadhaarImagesController } from "../controllers/admin/fethAadhaarImages.controller";
import { fetchAadhaarImagesDto } from "../../domain/zodSchemaDto/input/admin/fethAadhaarImages.dto";

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
