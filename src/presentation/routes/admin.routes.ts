import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { validateReqBody, validateReqQueryParams } from "@buxlo/common";
import { verifyProfileDto } from "../dto/admin/verifyProfile.dto";
import { VerifyprofileController } from "../controllers/admin/verifyprofile.controller";
import { fetchverifyprofileDto } from "../dto/admin/listverifyprofile.dto";
import { FetchVerifyProfileController } from "../controllers/admin/fetchVerifyProfile.controller";
import { FethAadhaarImagesController } from "../controllers/admin/fethAadhaarImages.controller";
import { fetchAadhaarImagesDto } from "../dto/admin/fethAadhaarImages.dto";
import { FetchUserSummeryController } from "../controllers/admin/fetchUserSummery.controller";
import { FetchMentorSummeryController } from "../controllers/admin/fetchMentorSummery.controller";

export class AdminRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _fetchVerifyProfileController!: FetchVerifyProfileController;
  private _verifyprofileController!: VerifyprofileController;
  private _fethAadhaarImagesController!: FethAadhaarImagesController;
  private _fetchUserSummeryController!: FetchUserSummeryController;
  private _fetchMentorSummeryController!: FetchMentorSummeryController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._fetchVerifyProfileController = new FetchVerifyProfileController(
      this._diContainer.adminFetchVerifyProfilesUseCase()
    );
    this._verifyprofileController = new VerifyprofileController(
      this._diContainer.adminVerifyprofileUseCase()
    );
    this._fethAadhaarImagesController = new FethAadhaarImagesController(
      this._diContainer.fetchS3ImageUseCase()
    );
    this._fetchUserSummeryController = new FetchUserSummeryController(
      this._diContainer.fetchUserSummeryUseCase()
    );
    this._fetchMentorSummeryController = new FetchMentorSummeryController(
      this._diContainer.fetchMentorSummeryUseCase()
    );
  
  }


  private _initializeRoutes(): void {
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
    this._router.get(
      "/fetchusersummery",
      this._fetchUserSummeryController.fetch
    );
    this._router.get(
      "/fetchmentorsummery",
      this._fetchMentorSummeryController.fetch
    );
    // this._router.get(
    //   "/fetchincomsummery",
    //   this._fetchIncomSummeryController.fetch
    // );
  }

  public getRouter(): Router {
    return this._router;
  }
}
