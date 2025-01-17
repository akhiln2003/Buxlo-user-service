import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchMentorProfileController } from "../controllers/mentor/fetchMentorProfileController";
import { UpdateMentorProfileController } from "../controllers/mentor/updateMentorProfileController";
import multer from "multer";
import { FetchMentorProfileImageController } from "../controllers/mentor/fetchMentorProfileImageController";
import { DeleteMentorProfileImageController } from "../controllers/mentor/deleteMentorProfileImageController";

const router = Router();
const diContainer = new DIContainer();

const upload = multer({ storage: multer.memoryStorage() });

// Inject dependencies into the Controller

const fetchprofileController = new FetchMentorProfileController(
  diContainer.fetchMentorProfileUseCase()
);

const updateprofileController = new UpdateMentorProfileController(
  diContainer.updateMentorProfileUseCase()
);

const fetchProfileImageController = new FetchMentorProfileImageController(
  diContainer.fetchProfileImageUseCase()
);

const deleteProfileImageController = new DeleteMentorProfileImageController(
  diContainer.deleteMentorProfileImageUseCase()
);

/////////////////////////////////////

// i wand to add middleware for validate endpoints

router.get("/fetchprofile/:id", fetchprofileController.fetchData);
router.put(
  "/updateprofile",
  upload.single("newProfileImage"),
  updateprofileController.update
);
router.get("/fetchprofileimage/:key", fetchProfileImageController.fetchImage);
router.delete(
  "/deleteprofileimage/:id/:key",
  deleteProfileImageController.deleteImage
);

export { router as mentorRoutes };
