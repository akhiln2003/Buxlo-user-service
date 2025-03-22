import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { ContactUsController } from "../controllers/common/contactUsController";

export class CommonRouter {
  private router: Router;
  private diContainer: DIContainer;

  private contactUsController!: ContactUsController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    this.contactUsController = new ContactUsController(
      this.diContainer.sendContactUsEmailUseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.post("/contactus", this.contactUsController.contact);
  }

  public getRouter(): Router {
    return this.router;
  }
}
