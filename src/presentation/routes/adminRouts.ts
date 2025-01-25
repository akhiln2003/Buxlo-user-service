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


const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

const diContainer = new DIContainer();

// Inject dependencies into the Controller

const createAdvController = new CreateAdvController(
  diContainer.createAdvUsecase()
);

const fetchAdvController = new FetchAdvController(
  diContainer.fetchAdvUseCase()
);

const fetchAdvImageController = new FetchAdvImageController(
  diContainer.fetchS3ImageUseCase()
);

const createTrustedUsUsController = new CreateTrustedUsUsController(
  diContainer.createTurstedUsUsecase()
);

const fetchtrustedusController = new FetchtrustedusController(
  diContainer.fetchtrustedUsUseCase()
);

const fetchtrustedusImageController = new FetchtrustedusImageController(
  diContainer.fetchS3ImageUseCase()
);

const deleteTrustedUsImageController = new DeleteTrustedUsImageController(
  diContainer.deleteTrustedUsUseCase()
);

const deleteAdvImageController = new DdeleteAdvImageController(
  diContainer.deleteAdvImageUseCase()
);


/////////////////////////////////////

router.post("/createadv", upload.single("image"), createAdvController.create);
router.get("/fetchadv", fetchAdvController.fetchData);
router.post("/fetchadvimage", fetchAdvImageController.fetchImages);
router.delete("/deleteadvimage/:id/:key", deleteAdvImageController.deleteImage);
router.post(
  "/createtrustedus",
  upload.single("image"),
  createTrustedUsUsController.create
);
router.get("/fetchtrustedus", fetchtrustedusController.fetchData);
router.post("/fetchtrustedusimage", fetchtrustedusImageController.fetchImages);
router.delete(
  "/deletetrustedusimage/:id/:key",
  deleteTrustedUsImageController.deleteImage
);



export { router as adminRoutes };
