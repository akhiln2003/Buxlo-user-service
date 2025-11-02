import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { ContactUsController } from "../controllers/common/contactUs.controller";
import { validateReqQueryParams } from "@buxlo/common";
import { fetchFeedbackDto } from "../dto/common/fetchFeedback.dto";
import { FetchFeedbackController } from "../controllers/common/fetchFeedback.controller";

export class CommonRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _contactUsController!: ContactUsController;
  private _fetchFeedbackController!: FetchFeedbackController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._contactUsController = new ContactUsController(
      this._diContainer.sendContactUsEmailUseCase()
    );
    this._fetchFeedbackController = new FetchFeedbackController(
      this._diContainer.fetchFeedbackUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.post("/contactus", this._contactUsController.contact);
    this._router.get(
      "/fetchfeedback",
      validateReqQueryParams(fetchFeedbackDto),
      this._fetchFeedbackController.fetch
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
