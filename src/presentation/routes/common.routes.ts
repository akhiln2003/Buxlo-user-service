import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { ContactUsController } from "../controllers/common/contactUs.controller";

export class CommonRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _contactUsController!: ContactUsController;

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
  }

  private _initializeRoutes(): void {
    this._router.post("/contactus", this._contactUsController.contact);
  }

  public getRouter(): Router {
    return this._router;
  }
}
