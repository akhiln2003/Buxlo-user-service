import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchUserProfileController } from "../controllers/user/fetchUserProfileController";
import multer from "multer";
import { UpdateUserProfileController } from "../controllers/user/updateUserProfileController";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

const diContainer = new DIContainer();


// Inject dependencies into the Controller


const fetchprofileController = new FetchUserProfileController(
    diContainer.fetchUserProfileUseCase()
);


const updateprofileController = new UpdateUserProfileController(
  diContainer.updateUserProfileUseCase()
);

// const fetchProfileImageController = new FetchUserProfileController(
//   diContainer.fetchProfileImageUseCase()
// );

/////////////////////////////////////


router.get("/fetchprofile/:id", fetchprofileController.fetchData );
router.put(
    "/updateprofile",
    upload.single("newProfileImage"),
    updateprofileController.update
  );
  // router.get("/fetchprofileimage/:key" , fetchProfileImageController.fetchImage);

export { router as userRoutes };
