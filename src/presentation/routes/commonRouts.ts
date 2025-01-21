import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { ContactUsController } from "../controllers/common/contactUsController";

const router = Router();
const diContainer = new DIContainer();

// Inject dependencies into the Controller

const contactUsController = new ContactUsController(
    diContainer.sendContactUsEmailUseCase()
);

/////////////////////////////////////

router.post("/contactus", contactUsController.contact);

export { router as commonRoutes };
